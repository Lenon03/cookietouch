import Account from "@account";
import LiteEvent from "@utils/LiteEvent";
import ScriptAction from "../actions/ScriptAction";

export interface IActionsManagerEventData {
  account: Account;
  success: boolean;
}

export default class ActionsManager {
  public fightsOnThisMap: number;

  public get ActionsFinished() { return this.onActionsFinished.expose(); }
  public get CustomHandled() { return this.onCustomHandled.expose(); }
  private readonly onActionsFinished = new LiteEvent<IActionsManagerEventData>();
  private readonly onCustomHandled = new LiteEvent<IActionsManagerEventData>();

  private account: Account;
  private actionsQueue: ScriptAction[];
  private currentAction: ScriptAction;
  private currentCoroutine: any = null;
  private fightsCounter: number;
  private gathersCounter: number;
  private mapChanged: boolean;

  constructor(account: Account) {
    this.account = account;
    this.actionsQueue = [];

    // this.account.game.map.MapChanged.on(this.map_mapChanged.bind(this));
    // this.account.game.managers.movements.MovementFinished.on(this.movements_movementFinished.bind(this));
    // this.account.game.managers.interactives.UseFinished.on(this.interactives_useFinished.bind(this));
    // this.account.game.fight.FightJoined.on(this.fight_fightJoined.bind(this));
    // this.account.game.managers.gathers.GatherFinished.on(this.gathers_gatherFinished.bind(this));
    // this.account.game.managers.gathers.GatherStarted.on(this.gathers_gatherStarted.bind(this));
    // this.account.game.npcs.QuestionReceived.on(this.npcs_questionReceived.bind(this));
    // this.account.game.storage.StorageStarted.on(this.storage_storageStarted.bind(this));
    // this.account.game.storage.StorageLeft.on(this.storage_storageLeft.bind(this));
    // this.account.game.npcs.DialogLeft.on(this.npcs_dialogLeft.bind(this));
    // this.account.game.exchange.ExchangeStarted.on(this.exchange_exchangeStarted.bind(this));
    // this.account.game.exchange.ExchangeLeft.on(this.exchange_exchangeLeft.bind(this));
    // this.account.game.bid.StartedBuying.on(this.bid_startedBuying.bind(this));
    // this.account.game.bid.StartedSelling.on(this.bid_startedSelling.bind(this));
    // this.account.game.bid.BidLeft.on(this.bid_bidLeft.bind(this));
    // this.account.game.managers.teleportables.UseFinished.on(this.teleportables_useFinished.bind(this));
  }
}
