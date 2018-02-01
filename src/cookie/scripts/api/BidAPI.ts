import Account from "@account";
import {AccountStates} from "@account/AccountStates";
import {List} from "linqts";
import BuyItemAction from "../actions/bid/BuyItemAction";
import EditItemInSalePriceAction from "../actions/bid/EditItemInSalePriceAction";
import RemoveItemInSaleAction from "../actions/bid/RemoveItemInSaleAction";
import SellItemAction from "../actions/bid/SellItemAction";
import StartBuyingAction from "../actions/bid/StartBuyingAction";
import StartSellingAction from "../actions/bid/StartSellingAction";

export interface IObjectInSale {
  gid: number;
  uid: number;
  lot: number;
  price: number;
}

export default class BidAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public startBuying(): boolean {
    if (this.account.isBusy) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new StartBuyingAction(), true);
    return true;
  }

  public async getItemPrice(gid: number, lot: number): Promise<number> {
    return await this.account.game.bid.getItemPrice(gid, lot);
  }

  public buyItem(gid: number, lot: number): boolean {
    if (this.account.state !== AccountStates.BUYING) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new BuyItemAction(gid, lot), true);
    return true;
  }

  public startSelling(): boolean {
    if (this.account.isBusy) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new StartSellingAction(), true);
    return true;
  }

  public getItemsInSale(): List<IObjectInSale> {
    const itemsInSale = new List<IObjectInSale>();
    // This will automatically handle the list being null
    if (this.account.state !== AccountStates.SELLING) {
      return itemsInSale;
    }

    const tmp = this.account.game.bid.objectsInSale.Select((t) => {
      return {
        gid: t.objectGID,
        lot: t.quantity,
        price: t.objectPrice,
        uid: t.objectUID,
      } as IObjectInSale;
    });

    itemsInSale.AddRange(tmp.ToArray());

    return itemsInSale;
  }

  public sellItem(gid: number, lot: number, price: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new SellItemAction(gid, lot, price), true);
    return true;
  }

  public removeItemInSale(uid: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new RemoveItemInSaleAction(uid), true);
    return true;
  }

  public editItemInSalePrice(uid: number, newPrice: number): boolean {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }
    if (newPrice === 0) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new EditItemInSalePriceAction(uid, newPrice), true);
    return true;
  }
}
