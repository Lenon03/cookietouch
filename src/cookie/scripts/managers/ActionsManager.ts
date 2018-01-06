import Account from "@account";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../actions/ScriptAction";

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

  public handleCustom(customFunction: any) {
    if (!this.account.scripts.running || this.currentCoroutine !== null) {
      return;
    }
    // this.currentCoroutine = this.account.scripts.scriptManager.script.createCoroutine(customFunction);
    this.processCoroutine();
  }

  public enqueueAction(action: ScriptAction, startDequeuingActions = false) {
    this.actionsQueue.push(action);
    if (startDequeuingActions) {
      this.dequeueActions(0);
    }

    // If this account is a group chief, enqueue the action to the others members
    // Special case: if there is a coroutine currently being handled, ignore this
    if (this.account.hasGroup && this.account.isGroupChief) {
      this.account.group.enqueueActionToMembers(action, startDequeuingActions);
    }
  }

  public clearEverything() {
    // Clear all actions in the queue
    this.clearActions();
    this.currentAction = null;
    this.currentCoroutine = null;
    // TODO: Ask the users if they want to leave the main counters
    this.fightsCounter = 0;
    this.gathersCounter = 0;
    this.fightsOnThisMap = 0;
  }

  public async dequeueActions(delay: number) {
    if (this.account && this.account.scripts.running === false) {
      return;
    }
    if (delay > 0) {
      await sleep(delay);
    }
    // If the queue still have actions
    if (this.actionsQueue.length > 0) {
      const action = this.actionsQueue.shift();
      this.currentAction = action;
      await this.processCurrentAction();
    } else {
      // If there is a coroutine currently being handled, process it
      // Otherwise tell the scripts manager that we're done
      if (this.currentCoroutine) {
        this.processCoroutine();
      } else {
        this.actionsFinished();
      }
    }
  }

  private processCoroutine() {
    if (!this.account.scripts.running) {
      return;
    }
    try {
      const name = this.currentAction ? this.currentAction.name : "Unknown";
      this.account.logger.logDebug("Scripts", `Processing coroutine: (last action: ${name})`);
      const result = this.currentCoroutine.resume(); // TODO: Handle coroutines!!!!
      // Check if the custom function ended
      // if (result.type === DataType.Void) {
      //   this.onCustomHandled();
      // }
    } catch (error) {
      this.account.scripts.stopScript(error);
    }
  }

  private async processCurrentAction()  {
    if (!this.account.scripts.running) {
      return;
    }
    const type = this.currentAction.name;

    const res = await this.currentAction.process(this.account);
    switch (res) {
      case ScriptActionResults.DONE:
        this.account.logger.logDebug("ActionsManager", `${type} DONE.`);
        this.dequeueActions(100);
        break;
      case ScriptActionResults.FAILED:
        this.account.logger.logDebug("ActionsManager", `${type} FAILED.`);
        break;
      case ScriptActionResults.PROCESSING:
        break;
    }
  }

  private clearActions()  {
    this.actionsQueue = [];
    this.currentAction = null;
  }

  private actionsFinished() {
    if (this.mapChanged) {
      this.mapChanged = false;
      this.onActionsFinished.trigger({ account: this.account, success: true });
    } else {
      this.onActionsFinished.trigger({ account: this.account, success: false });
    }
  }

  private customHandled() {
    this.currentCoroutine = null;
    if (this.mapChanged) {
      this.mapChanged = false;
      this.onCustomHandled.trigger({ account: this.account, success: true });
    } else {
      this.onCustomHandled.trigger({ account: this.account, success: false });
    }
  }
}
