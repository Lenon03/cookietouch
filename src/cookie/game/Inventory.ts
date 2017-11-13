import { Managers } from "../managers";
import { Account } from "./Account";

export default class Inventory {
  public kamas: number;
  public objects: any;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }
  private register() {
    this.account.dispatcher.register("InventoryContentMessage",
                this.HandleInventoryContentMessage, this);
    this.account.dispatcher.register("InventoryWeightMessage",
                this.HandleInventoryWeightMessage, this);
  }
  private HandleInventoryContentMessage(account: Account, data: any) {
    this.kamas = data.kamas;
    this.objects = data.objects;
  }
  private HandleInventoryWeightMessage(account: Account, data: any) {
    //
  }
}
