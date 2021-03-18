import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import BuyItemAction from "@/scripts/actions/bid/BuyItemAction";
import EditItemInSalePriceAction from "@/scripts/actions/bid/EditItemInSalePriceAction";
import RemoveItemInSaleAction from "@/scripts/actions/bid/RemoveItemInSaleAction";
import SellItemAction from "@/scripts/actions/bid/SellItemAction";
import StartBuyingAction from "@/scripts/actions/bid/StartBuyingAction";
import StartSellingAction from "@/scripts/actions/bid/StartSellingAction";

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

  public async startBuying(): Promise<boolean> {
    if (this.account.isBusy) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StartBuyingAction(),
      true
    );
    return true;
  }

  public async getItemPrice(gid: number, lot: number): Promise<number> {
    return this.account.game.bid.getItemPrice(gid, lot);
  }

  public async buyItem(gid: number, lot: number): Promise<boolean> {
    if (this.account.state !== AccountStates.BUYING) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new BuyItemAction(gid, lot),
      true
    );
    return true;
  }

  public async startSelling(): Promise<boolean> {
    if (this.account.isBusy) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StartSellingAction(),
      true
    );
    return true;
  }

  public itemsInSaleCount(): number {
    return this.account.game.bid.objectsInSale
      ? this.account.game.bid.objectsInSale.Count()
      : 0;
  }

  public getItemsInSale(): IObjectInSale[] {
    // This will automatically handle the list being null
    if (this.account.state !== AccountStates.SELLING) {
      return [];
    }

    const tmp = this.account.game.bid.objectsInSale.Select(t => {
      return {
        gid: t.objectGID,
        lot: t.quantity,
        price: t.objectPrice,
        uid: t.objectUID
      } as IObjectInSale;
    });

    return tmp.ToArray();
  }

  public async sellItem(
    gid: number,
    lot: number,
    price: number
  ): Promise<boolean> {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new SellItemAction(gid, lot, price),
      true
    );
    return true;
  }

  public async removeItemInSale(uid: number): Promise<boolean> {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new RemoveItemInSaleAction(uid),
      true
    );
    return true;
  }

  public async editItemInSalePrice(
    uid: number,
    newPrice: number
  ): Promise<boolean> {
    if (this.account.state !== AccountStates.SELLING) {
      return false;
    }
    if (newPrice === 0) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new EditItemInSalePriceAction(uid, newPrice),
      true
    );
    return true;
  }
}
