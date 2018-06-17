import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import BidConfiguration from "@/extensions/bid/BidConfiguration";
import ObjectToSellEntry from "@/extensions/bid/ObjectToSellEntry";
import ExchangeBidHouseItemAddOkMessage from "@/protocol/network/messages/ExchangeBidHouseItemAddOkMessage";
import TextInformationMessage from "@/protocol/network/messages/TextInformationMessage";
import Dictionary from "@/utils/Dictionary";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";
import TimerWrapper from "@/utils/TimerWrapper";

export default class BidExtension implements IClearable {
  public kamasGained: number = 0;
  public kamasPaidOnTaxes: number = 0;
  public config: BidConfiguration;

  private account: Account;
  private timer: TimerWrapper;
  private enabled: boolean = false;
  private waiting: boolean = false;
  private pricesInBid: Dictionary<number, number[]>;
  private readonly onStarted = new LiteEvent<void>();
  private readonly onStopped = new LiteEvent<void>();
  private readonly onStatisticsUpdated = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.config = new BidConfiguration(account);
    this.timer = new TimerWrapper(this.timerCallback, this, 1000);

    this.account.game.bid.StartedBuying.on(this.startedBuying);
    this.account.game.bid.StartedSelling.on(this.startedSelling);
    this.account.scripts.ScriptStopped.on(this.onScriptStopped);
    this.account.dispatcher.register(
      "ExchangeBidHouseItemAddOkMessage",
      this.HandleExchangeBidHouseItemAddOkMessage,
      this
    );
    this.account.dispatcher.register(
      "TextInformationMessage",
      this.HandleTextInformationMessage,
      this
    );
  }

  public get Started() {
    return this.onStarted.expose();
  }

  public get Stopped() {
    return this.onStopped.expose();
  }

  public get StatisticsUpdated() {
    return this.onStatisticsUpdated.expose();
  }

  private get running() {
    return this.enabled && !this.waiting;
  }

  public start() {
    if (this.enabled) {
      return;
    }
    if (this.config.objectsToSell.Count() === 0) {
      this.account.logger.logError(
        LanguageManager.trans("bidExtension"),
        LanguageManager.trans("noObjectsToSell")
      );
      return;
    }
    this.enabled = true;
    this.timer.start();
    this.onStarted.trigger();
  }

  public stop() {
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    this.timer.change(1000);
    this.timer.stop();
    this.onStopped.trigger();
  }

  public clear() {
    this.kamasGained = 0;
    this.kamasPaidOnTaxes = 0;
    this.pricesInBid = null;
    this.waiting = false;
    this.stop();
  }

  private process() {
    if (!this.running) {
      return;
    }
    this.account.logger.logDebug(
      LanguageManager.trans("bidExtension"),
      LanguageManager.trans("obtainBidPrices")
    );
    this.account.game.bid.startBuying();
  }

  private timerCallback() {
    this.waiting = false;
    this.timer.stop();
    if (!this.enabled) {
      return;
    }
    this.process();
  }

  private startedBuying = async () => {
    if (!this.running) {
      return;
    }
    await sleep(400);
    // Get all the prices and save them
    this.pricesInBid = new Dictionary<number, number[]>();
    const gids = this.config.objectsToSell
      .Select(o => o.gid)
      .Distinct()
      .ToArray();
    for (const gid of gids) {
      const prices = await this.account.game.bid.getItemPrices(gid);
      this.pricesInBid.add(gid, prices);
      await sleep(800);
    }
    // Close the bidbuyer
    this.account.logger.logInfo(
      LanguageManager.trans("bidExtension"),
      LanguageManager.trans("pricesObtained")
    );
    this.account.leaveDialog();
    await sleep(600);
    // Open bidseller
    this.account.game.bid.startSelling();
  };

  private startedSelling = async () => {
    // Process sales session
    await this.processSalesSession();
  };

  private onScriptStopped = (name: string) => {
    if (!this.enabled) {
      return;
    }
    this.setTimerInterval();
  };

  private async processSalesSession() {
    if (!this.running) {
      return;
    }
    this.account.logger.logInfo(
      LanguageManager.trans("bidExtension"),
      LanguageManager.trans("salesBegin")
    );
    // For every ObjectToSell that we have
    const objects = this.config.objectsToSell.ToArray();
    for (const objToSell of objects) {
      // Get the items that are already in the bid for this specific ObjectToSell
      const objsInSale = this.account.game.bid.objectsInSale.Where(
        o => o.objectGID === objToSell.gid && o.quantity === objToSell.lot
      );
      // Get the price in bid of this specific ObjectToSell
      const priceInBid = this.pricesInBid.getValue(objToSell.gid)[
        this.lotToIndex(objToSell.lot)
      ];
      // This will hold the price that should our objects have (either modified or added)
      let newPrice = priceInBid;
      let ours = true;
      // If the price in bid is 0 (sold out), the new price will be the base price
      if (priceInBid === 0) {
        newPrice = objToSell.basePrice;
      } else if (objsInSale.Count() === 0) {
        // If we have no objects in sale, the new price will be the price in bid - 1
        newPrice = priceInBid - 1;
      } else {
        // If the price in bid is not 0 and we have objects in sale
        // Get the smallest price in our objects in sale
        const smallestPrice = objsInSale.Select(o => o.objectPrice).Min();
        // If the price in the bid is less than the smallest price in our objects in sale, it means it's not ours
        if (priceInBid < smallestPrice) {
          ours = false;
          newPrice = priceInBid - 1;
        }
      }
      // If the price is invalid, ignore this object to sell
      if (this.isPriceInvalid(objToSell, priceInBid, newPrice)) {
        continue;
      }
      // Check if we need to modify our objects in sale
      if (!ours && objsInSale.Count() > 0) {
        for (const o of objsInSale.ToArray()) {
          this.account.logger.logDebug(
            LanguageManager.trans("bidExtension"),
            LanguageManager.trans(
              "bidUpdatePrice",
              objToSell.lot,
              objToSell.name,
              newPrice
            )
          );
          if (
            await this.account.game.bid.editItemInSalePrice(
              o.objectUID,
              newPrice
            )
          ) {
            await sleep(800);
          }
        }
      }
      // Check if we need to sell more objects
      if (objToSell.quantity - objsInSale.Count() > 0) {
        // Sell as long as we have the enough in the inventory
        const obj = this.account.game.character.inventory.getObjectByGid(
          objToSell.gid
        );
        let qty = obj ? obj.quantity : 0;
        for (let j = 0; j < objToSell.quantity - objsInSale.Count(); j++) {
          // Check if we don't have the needed quantity in our inventory
          if (qty < objToSell.lot) {
            this.account.logger.logWarning(
              LanguageManager.trans("bidExtension"),
              LanguageManager.trans(
                "bidNoQuantity",
                objToSell.lot,
                objToSell.name
              )
            );
            break;
          }
          // If we do, try and sell!
          this.account.logger.logDebug(
            LanguageManager.trans("bidExtension"),
            LanguageManager.trans(
              "bidSellItem",
              objToSell.lot,
              objToSell.name,
              newPrice
            )
          );
          if (
            this.account.game.bid.sellItem(
              objToSell.gid,
              objToSell.lot,
              newPrice
            )
          ) {
            qty -= objToSell.lot;
            await sleep(800);
          }
        }
      }
    }
    this.account.logger.logInfo(
      LanguageManager.trans("bidExtension"),
      LanguageManager.trans("salesEnded")
    );
    this.account.leaveDialog();
    await sleep(800);
    // Check if we need to start a script
    if (this.config.isScriptPathValid) {
      try {
        this.account.scripts.fromFile(this.config.scriptPath);
        // We'll just assume that if we got to this line, the script will 100% start
        this.account.scripts.startScript();
      } catch (error) {
        this.account.logger.logError(
          LanguageManager.trans("scriptsManager"),
          LanguageManager.trans("bidError", error)
        );
      }
    } else {
      // Or just start waiting
      this.setTimerInterval();
    }
  }

  private isPriceInvalid(
    objToSell: ObjectToSellEntry,
    priceInBid: number,
    newPrice: number
  ) {
    if (newPrice === 0) {
      this.account.logger.logWarning(
        LanguageManager.trans("bidExtension"),
        LanguageManager.trans("bidLowered", objToSell.lot, objToSell.name)
      );
      return true;
    }
    if (newPrice < objToSell.minPrice) {
      this.account.logger.logWarning(
        LanguageManager.trans("bidExtension"),
        LanguageManager.trans(
          "bidExceeded",
          objToSell.lot,
          objToSell.name,
          priceInBid,
          objToSell.minPrice
        )
      );
      return true;
    }
    return false;
  }

  private lotToIndex(lot: number) {
    return lot === 1 ? 0 : lot === 10 ? 1 : 2;
  }

  private setTimerInterval() {
    this.waiting = true;
    this.account.logger.logInfo(
      LanguageManager.trans("bidExtension"),
      LanguageManager.trans("bidNextSession", this.config.interval)
    );
    this.timer.change(this.config.interval * 60000);
  }

  private async HandleExchangeBidHouseItemAddOkMessage(
    account: Account,
    message: ExchangeBidHouseItemAddOkMessage
  ) {
    this.kamasPaidOnTaxes += Math.max(
      ...[1, Math.round((message.itemInfo.objectPrice * 3) / 100)]
    );
    this.onStatisticsUpdated.trigger();
  }

  private async HandleTextInformationMessage(
    account: Account,
    message: TextInformationMessage
  ) {
    if (message.msgId === 65 && message.parameters.length > 0) {
      this.kamasGained += parseInt(message.parameters[0], 10);
      this.onStatisticsUpdated.trigger();
    }
  }
}
