import Account from "@/account";
import ExchangePutAllItemsAction from "@/scripts/actions/exchange/ExchangePutAllItemsAction";
import ExchangePutItemAction from "@/scripts/actions/exchange/ExchangePutItemAction";
import ExchangePutKamasAction from "@/scripts/actions/exchange/ExchangePutKamasAction";
import ExchangeRemoveAllItemsAction from "@/scripts/actions/exchange/ExchangeRemoveAllItemsAction";
import ExchangeRemoveItemAction from "@/scripts/actions/exchange/ExchangeRemoveItemAction";
import ExchangeRemoveKamasAction from "@/scripts/actions/exchange/ExchangeRemoveKamasAction";
import SendReadyAction from "@/scripts/actions/exchange/SendReadyAction";
import StartExchangeAction from "@/scripts/actions/exchange/StartExchangeAction";
import StartShopAction from "../actions/exchange/StartShopAction";
import AddItemShopAction from "../actions/exchange/AddItemShopAction";

export default class ExchangeAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public weightP(): number {
    return this.account.game.exchange.weightPercent;
  }

  public targetWeightP(): number {
    return this.account.game.exchange.remoteWeightPercent;
  }

  public async startExchange(playerId: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new StartExchangeAction(playerId),
      true
    );
  }
  public async startShop() {
    await this.account.scripts.actionsManager.enqueueAction(
      new StartShopAction(),
      true
    );
  }
  public async sendReady() {
    await this.account.scripts.actionsManager.enqueueAction(
      new SendReadyAction(),
      true
    );
  }
  public async addItemShop(gid: number, quantity: number, price: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new AddItemShopAction(gid, quantity, price),
      true
    );
  }
  public async putItem(gid: number, qty: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new ExchangePutItemAction(gid, qty),
      true
    );
  }

  public async removeItem(gid: number, qty: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new ExchangeRemoveItemAction(gid, qty),
      true
    );
  }

  public async putAllItems() {
    await this.account.scripts.actionsManager.enqueueAction(
      new ExchangePutAllItemsAction(),
      true
    );
  }

  public async removeAllItems() {
    await this.account.scripts.actionsManager.enqueueAction(
      new ExchangeRemoveAllItemsAction(),
      true
    );
  }

  public async putKamas(qty: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new ExchangePutKamasAction(qty),
      true
    );
  }

  public async removeKamas(qty: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new ExchangeRemoveKamasAction(qty),
      true
    );
  }
}
