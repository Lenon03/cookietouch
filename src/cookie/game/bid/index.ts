import LanguageManager from "@/configurations/language/LanguageManager";
import { DataTypes } from "@/protocol/data/DataTypes";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import DataManager from "@protocol/data";
import Items from "@protocol/data/classes/Items";
import { ExchangeErrorEnum } from "@protocol/enums/ExchangeErrorEnum";
import BidExchangerObjectInfo from "@protocol/network/types/BidExchangerObjectInfo";
import ObjectItemToSellInBid from "@protocol/network/types/ObjectItemToSellInBid";
import { Deferred } from "@utils/Deferred";
import IClearable from "@utils/IClearable";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import { List } from "linqts";

export default class Bid implements IClearable {
  public maxItemPerAccount: number;
  public objectsInSale: List<ObjectItemToSellInBid>;

  private _itemDescription = Deferred<List<BidExchangerObjectInfo>>();
  private _lastSearchedGID: number;
  private account: Account;
  private readonly onStartedBuying = new LiteEvent<void>();
  private readonly onStartedSelling = new LiteEvent<void>();
  private readonly onBidLeft = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
  }

  public get StartedBuying() {
    return this.onStartedBuying.expose();
  }

  public get StartedSelling() {
    return this.onStartedSelling.expose();
  }

  public get BidLeft() {
    return this.onBidLeft.expose();
  }

  public clear() {
    this._itemDescription = null;
    this._lastSearchedGID = 0;
    this.maxItemPerAccount = 0;
  }

  public startBuying(): boolean {
    if (this.account.isBusy) {
      return false;
    }

    this.account.network.sendMessageFree("NpcGenericActionRequestMessage", {
      npcActionId: 6,
      npcId: 0,
      npcMapId: this.account.game.map.id
    });
    return true;
  }

  public async getItemPrice(gid: number, lot: number): Promise<number> {
    if (this.account.state !== AccountStates.BUYING) {
      return 0;
    }

    const cheapestItem = await this.getCheapestItem(gid, lot);

    // In case the item wasn't found
    if (cheapestItem === null) {
      return 0;
    }

    return cheapestItem.prices[lot === 1 ? 0 : lot === 10 ? 1 : 2];
  }

  public async getItemPrices(gid: number): Promise<number[]> {
    if (this.account.state !== AccountStates.BUYING) {
      return null;
    }

    const resp = await this.initializeGetItemPrice(gid);
    if (!resp) {
      return null;
    }

    // Item not found in bid
    const res = await this._itemDescription.promise;
    if (res === null || res.Count() === 0) {
      return [0, 0, 0];
    }

    const prices1 = res.ToArray().map(o => o.prices[0]);
    const prices10 = res.ToArray().map(o => o.prices[1]);
    const prices100 = res.ToArray().map(o => o.prices[2]);

    return [
      Math.min(...prices1),
      Math.min(...prices10),
      Math.min(...prices100)
    ];
  }

  public async buyItem(gid: number, lot: number): Promise<boolean> {
    if (this.account.state !== AccountStates.BUYING) {
      return false;
    }

    const cheapestItem = await this.getCheapestItem(gid, lot);

    // In case the item wasn't found
    if (cheapestItem === null) {
      return false;
    }

    console.log(cheapestItem);

    const price = await cheapestItem.prices[lot === 1 ? 0 : lot === 10 ? 1 : 2];

    // Not enough kamas
    if (price > this.account.game.character.inventory.kamas) {
      this.account.logger.logWarning(
        LanguageManager.trans("bid"),
        LanguageManager.trans("bidNoKamas", lot, gid, price)
      );
      return false;
    }

    await this.account.network.sendMessageFree("ExchangeBidHouseBuyMessage", {
      price,
      qty: lot,
      uid: cheapestItem.objectUID
    });

    return true;
  }

  public startSelling(): boolean {
    if (this.account.isBusy) {
      return false;
    }

    this.account.network.sendMessageFree("NpcGenericActionRequestMessage", {
      npcActionId: 5,
      npcId: 0,
      npcMapId: this.account.game.map.id
    });
    return true;
  }

  public sellItem(gid: number, lot: number, price: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }

    const item = this.account.game.character.inventory.getObjectByGid(gid);

    if (item === undefined || item.quantity < lot) {
      return false;
    }

    this.account.network.sendMessageFree("ExchangeObjectMovePricedMessage", {
      objectUID: item.uid,
      price,
      quantity: lot
    });

    this.account.logger.logInfo(
      LanguageManager.trans("bid"),
      LanguageManager.trans("bidSale", lot, item.name, price)
    );
    return true;
  }

  public removeItemInSale(uid: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }

    const itemInSale = this.objectsInSale.FirstOrDefault(
      o => o.objectUID === uid
    );

    if (itemInSale === null) {
      return false;
    }

    this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
      objectUID: itemInSale.objectUID,
      price: itemInSale.objectPrice,
      quantity: itemInSale.quantity * -1
    });

    return true;
  }

  public async editItemInSalePrice(
    uid: number,
    newPrice: number
  ): Promise<boolean> {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }

    const itemInSale = this.objectsInSale.FirstOrDefault(
      o => o.objectUID === uid
    );

    if (itemInSale === null) {
      return false;
    }

    if (!this.removeItemInSale(uid)) {
      return false;
    }

    await sleep(1500);

    this.sellItem(itemInSale.objectUID, itemInSale.quantity, newPrice);

    return true;
  }

  public async UpdateExchangeStartedBidBuyerMessage(message: any) {
    this.account.state = AccountStates.BUYING;
    this.maxItemPerAccount = message.buyerDescriptor.maxItemPerAccount;
    this.onStartedBuying.trigger();
  }

  public async UpdateExchangeTypesItemsExchangerDescriptionForUserMessage(
    message: any
  ) {
    this._itemDescription.resolve(new List(message.itemTypeDescriptions));
  }

  public async UpdateExchangeStartedBidSellerMessage(message: any) {
    this.account.state = AccountStates.SELLING;
    this.maxItemPerAccount = message.sellerDescriptor.maxItemPerAccount;
    this.objectsInSale = new List(message.objectsInfos);
    this.onStartedSelling.trigger();
  }

  public async UpdateExchangeErrorMessage(message: any) {
    this.account.logger.logError(
      "ExchangeError",
      `${ExchangeErrorEnum[message.errorType]}`
    );
    if (message.errorType !== 11 || this._itemDescription === null) {
      return;
    }
    this._itemDescription.resolve(null);
  }

  public async UpdateExchangeLeaveMessage(message: any) {
    if (
      this.account.state !== AccountStates.BUYING &&
      this.account.state !== AccountStates.SELLING
    ) {
      return;
    }

    this.account.state = AccountStates.NONE;
    this.clear();
    this.onBidLeft.trigger();
  }

  private async getCheapestItem(
    gid: number,
    lot: number
  ): Promise<BidExchangerObjectInfo> {
    if (this.account.state !== AccountStates.BUYING) {
      return null;
    }

    const resp = await this.initializeGetItemPrice(gid);
    if (!resp) {
      return null;
    }

    const list = await this._itemDescription.promise;

    if (list === null || list.Count() === 0) {
      return null;
    }

    const index = lot === 1 ? 0 : lot === 10 ? 1 : 2;

    return list.OrderBy(o => o.prices[index]).First();
  }

  private async initializeGetItemPrice(gid: number): Promise<boolean> {
    const itemRes = await DataManager.get<Items>(DataTypes.Items, gid);

    if (itemRes.length === 0) {
      return false;
    }

    const item = itemRes[0].object;

    if (this._lastSearchedGID !== gid || this._itemDescription === null) {
      this._itemDescription = Deferred<List<BidExchangerObjectInfo>>();
      this.account.network.sendMessageFree("ExchangeBidHouseSearchMessage", {
        genId: gid,
        type: item.typeId
      });

      await this._itemDescription.promise;
      this._lastSearchedGID = gid;
    }

    return true;
  }
}
