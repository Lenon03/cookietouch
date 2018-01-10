import ExchangePutAllItemsAction from "@/scripts/actions/exchange/ExchangePutAllItemsAction";
import ExchangePutItemAction from "@/scripts/actions/exchange/ExchangePutItemAction";
import ExchangePutKamasAction from "@/scripts/actions/exchange/ExchangePutKamasAction";
import ExchangeRemoveItemAction from "@/scripts/actions/exchange/ExchangeRemoveItemAction";
import ExchangeRemoveKamasAction from "@/scripts/actions/exchange/ExchangeRemoveKamasAction";
import SendReadyAction from "@/scripts/actions/exchange/SendReadyAction";
import StartExchangeAction from "@/scripts/actions/exchange/StartExchangeAction";
import Account from "@account";

export default class ExchangeAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public get weightP(): number {
    return this.account.game.exchange.weightPercent;
  }

  public get targetWeightP(): number {
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
