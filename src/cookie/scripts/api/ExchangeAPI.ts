import Account from "@account";
import ExchangePutAllItemsAction from "../actions/exchange/ExchangePutAllItemsAction";
import ExchangePutItemAction from "../actions/exchange/ExchangePutItemAction";
import ExchangePutKamasAction from "../actions/exchange/ExchangePutKamasAction";
import ExchangeRemoveItemAction from "../actions/exchange/ExchangeRemoveItemAction";
import ExchangeRemoveKamasAction from "../actions/exchange/ExchangeRemoveKamasAction";
import SendReadyAction from "../actions/exchange/SendReadyAction";
import StartExchangeAction from "../actions/exchange/StartExchangeAction";

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

  public startExchange(playerId: number) {
    this.account.scripts.actionsManager.enqueueAction(new StartExchangeAction(playerId), true);
  }

  public sendReady() {
    this.account.scripts.actionsManager.enqueueAction(new SendReadyAction(), true);
  }

  public putItem(gid: number, qty: number) {
    this.account.scripts.actionsManager.enqueueAction(new ExchangePutItemAction(gid, qty), true);
  }

  public removeItem(gid: number, qty: number) {
    this.account.scripts.actionsManager.enqueueAction(new ExchangeRemoveItemAction(gid, qty), true);
  }

  public putAllItems() {
    this.account.scripts.actionsManager.enqueueAction(new ExchangePutAllItemsAction(), true);
  }

  public putKamas(qty: number) {
    this.account.scripts.actionsManager.enqueueAction(new ExchangePutKamasAction(qty), true);
  }

  public removeKamas(qty: number) {
    this.account.scripts.actionsManager.enqueueAction(new ExchangeRemoveKamasAction(qty), true);
  }
}
