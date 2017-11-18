import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import DataManager from "@protocol/data";
import Items from "@protocol/data/classes/Items";
import { ExchangeErrorEnum } from "@protocol/enums/ExchangeErrorEnum";
import BidExchangerObjectInfo from "@protocol/network/types/BidExchangerObjectInfo";
import ObjectItemToSellInBid from "@protocol/network/types/ObjectItemToSellInBid";
import { Deferred, IDeferred } from "@utils/Deferred";
import IClearable from "@utils/IClearable";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";

export default class Bid implements IClearable {
  public maxItemPerAccount: number;
  public objectsInSale: ObjectItemToSellInBid[];

  private _itemDescription = Deferred<BidExchangerObjectInfo[]>();
  private _lastSearchedGID: number;
  private account: Account;

  public get StartedBuying() { return this.onStartedBuying.expose(); }
  public get StartedSelling() { return this.onStartedSelling.expose(); }
  public get BidLeft() { return this.onBidLeft.expose(); }
  private readonly onStartedBuying = new LiteEvent<void>();
  private readonly onStartedSelling = new LiteEvent<void>();
  private readonly onBidLeft = new LiteEvent<void>();

  constructor(account: Account) {
    // this.clear();
    this.account = account;
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

    this.account.network.sendMessage("NpcGenericActionRequestMessage", {
      npcActionId: 6,
      npcId: 0,
      npcMapId: this.account.game.map.id,
    });
    return true;
  }

  public getItemPrice(gid: number, lot: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      if (this.account.state !== AccountStates.BUYING) {
        reject(0);
        return;
      }

      const cheapestItem = await this.getCheapestItem(gid, lot);

      // In case the item wasn't found
      if (cheapestItem === null) {
        reject(0);
        return;
      }

      resolve(cheapestItem.prices[lot === 1 ? 0 : lot === 10 ? 1 : 2]);
      return;
    });
  }

  public getItemPrices(gid: number): Promise<number[]> {
    return new Promise(async (resolve, reject) => {
      if (this.account.state !== AccountStates.BUYING) {
        reject(null);
        return;
      }

      if (!this.initializeGetItemPrice(gid)) {
        reject(null);
        return;
      }

      // Item not found in bid
      const res = await this._itemDescription.promise;
      if (this._itemDescription === null || res.length === 0) {
        resolve([0, 0, 0]);
      }

      console.log(res);

      // return [
      //   Math.min(res),
      // ];
    });
  }

  // private minimumPrice(obj: BidExchangerObjectInfo[]) {
  //   const tempHighSerie = (obj || []).map((x) => x.prices).reduce((p, n) => );
  //   return Math.min(...tempHighSerie);
  // }

  public buyItem(gid: number, lot: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.account.state !== AccountStates.BUYING) {
        reject(false);
        return;
      }

      const cheapestItem = await this.getCheapestItem(gid, lot);

      // In case the item wasn't found
      if (cheapestItem === null) {
        reject(false);
        return;
      }

      console.log(cheapestItem);

      const price = await cheapestItem.prices[lot === 1 ? 0 : lot === 10 ? 1 : 2];

      // Not enough kamas
      if (price > this.account.game.character.inventory.kamas) {
        this.account.logger.logWarning("",
          `Vous n'avez pas assez de kamas pour acheter ${lot} lots de l'objet ${gid}. Il vous faut ${price} kamas`);
        reject(false);
        return;
      }

      await this.account.network.sendMessage("ExchangeBidHouseBuyMessage", {
        price,
        qty: lot,
        uid: cheapestItem.objectUID,
      });

      resolve(true);
    });
  }

  public startSelling(): boolean {
    if (this.account.isBusy) {
      return false;
    }

    this.account.network.sendMessage("NpcGenericActionRequestMessage", {
      npcActionId: 5,
      npcId: 0,
      npcMapId: this.account.game.map.id,
    });
    return true;
  }

  public sellItem(gid: number, lot: number, price: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }

    const item = this.account.game.character.inventory.getObjectByGid(gid);

    if (item === null || item.quantity < lot) {
      return false;
    }

    this.account.network.sendMessage("ExchangeObjectMovePricedMessage", {
      objectUID: item.uid,
      price,
      quantity: lot,
    });

    this.account.logger.logInfo("", `Vous avez mis en vente ${lot} ${item.name} pour ${price} kamas.`);
    return true;
  }

  public removeItemInSale(uid: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }

    const itemInSale = this.objectsInSale.find((o) => o.objectUID === uid);

    if (itemInSale === null) {
      return false;
    }

    this.account.network.sendMessage("ExchangeObjectMoveMessage", {
      objectUID: itemInSale.objectUID,
      price: itemInSale.objectPrice,
      quantity: itemInSale.quantity * -1,
    });

    return true;
  }

  public editItemInSalePrice(uid: number, newPrice: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }

    const itemInSale = this.objectsInSale.find((o) => o.objectUID === uid);

    if (itemInSale === null) {
      return false;
    }

    if (!this.removeItemInSale(uid)) {
      return false;
    }

    sleep(1500);

    this.sellItem(itemInSale.objectUID, itemInSale.quantity, newPrice);

    return true;
  }

  public async UpdateExchangeStartedBidBuyerMessage(message: any) {
    this.account.state = AccountStates.BUYING;
    this.maxItemPerAccount = message.buyerDescriptor.maxItemPerAccount;
    this.onStartedBuying.trigger();
  }

  public async UpdateExchangeTypesItemsExchangerDescriptionForUserMessage(message: any) {
    this._itemDescription.resolve(message.itemTypeDescriptions);
  }

  public async UpdateExchangeStartedBidSellerMessage(message: any) {
    this.account.state = AccountStates.SELLING;
    this.maxItemPerAccount = message.sellerDescriptor.maxItemPerAccount;
    this.objectsInSale = message.objectsInfos;
    this.onStartedSelling.trigger();
  }

  public async UpdateExchangeErrorMessage(message: any) {
    this.account.logger.logError("ExchangeError", `${ExchangeErrorEnum[message.errorType]}`);
    if (message.errorType !== 11 || this._itemDescription === null) {
      return;
    }
    this._itemDescription.resolve(null);
  }

  public async UpdateExchangeLeaveMessage(message: any) {
    if (this.account.state !== AccountStates.BUYING && this.account.state !== AccountStates.SELLING) {
      return;
    }

    this.account.state = AccountStates.NONE;
    this.clear();
    this.onBidLeft.trigger();
  }

  private getCheapestItem(gid: number, lot: number): Promise<BidExchangerObjectInfo> {
    return new Promise(async (resolve, reject) => {
      if (this.account.state !== AccountStates.BUYING) {
        reject(null);
        return;
      }

      const resp = await this.initializeGetItemPrice(gid);
      if (!resp) {
        reject(null);
        return;
      }

      const list = await this._itemDescription.promise;
      if (this._itemDescription === null || list === null || list.length === 0) {
        reject(null);
        return;
      }

      const index = lot === 1 ? 0 : lot === 10 ? 1 : 2;
      console.log(list);
      console.log(list.sort((elem) => elem.prices[index])[0]);
      resolve(list.sort((elem) => elem.prices[index])[0]);
    });
  }

  private initializeGetItemPrice(gid: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const itemRes = await DataManager.get(Items, gid);

      if (itemRes.length === 0) {
        reject(false);
        return;
      }

      const item = itemRes[0].object;

      if (this._lastSearchedGID !== gid || this._itemDescription === null) {
        this._itemDescription = Deferred<BidExchangerObjectInfo[]>();
        this.account.network.sendMessage("ExchangeBidHouseSearchMessage", {
          genId: gid,
          type: item._type,
        });

        await this._itemDescription.promise;
        this._lastSearchedGID = gid;
      }

      resolve(true);
    });
  }
}
