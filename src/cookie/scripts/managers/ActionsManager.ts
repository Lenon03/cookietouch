import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { GatherResults } from "@game/managers/gathers";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import StartBuyingAction from "../actions/bid/StartBuyingAction";
import StartSellingAction from "../actions/bid/StartSellingAction";
import SendReadyAction from "../actions/exchange/SendReadyAction";
import StartExchangeAction from "../actions/exchange/StartExchangeAction";
import FightAction from "../actions/fight/FightAction";
import GatherAction from "../actions/gather/GatherAction";
import LeaveDialogAction from "../actions/global/LeaveDialogAction";
import ChangeMapAction from "../actions/map/ChangeMapAction";
import MoveToCellAction from "../actions/map/MoveToCellAction";
import SaveZaapAction from "../actions/map/SaveZaapAction";
import UseAction from "../actions/map/UseAction";
import UseByIdAction from "../actions/map/UseByIdAction";
import UseLockedHouseAction from "../actions/map/UseLockedHouseAction";
import UseLockedStorageAction from "../actions/map/UseLockedStorageAction";
import UseTeleportableAction from "../actions/map/UseTeleportableAction";
import WaitMapChangeAction from "../actions/map/WaitMapChangeAction";
import NpcAction from "../actions/npcs/NpcAction";
import NpcBankAction from "../actions/npcs/NpcBankAction";
import ReplyAction from "../actions/npcs/ReplyAction";
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

    this.account.game.map.MapChanged.on(this.map_mapChanged.bind(this));
    this.account.game.managers.movements.MovementFinished.on(this.movements_movementFinished.bind(this));
    this.account.game.managers.interactives.UseFinished.on(this.interactives_useFinished.bind(this));
    this.account.game.fight.FightJoined.on(this.fight_fightJoined.bind(this));
    this.account.game.managers.gathers.GatherFinished.on(this.gathers_gatherFinished.bind(this));
    this.account.game.managers.gathers.GatherStarted.on(this.gathers_gatherStarted.bind(this));
    this.account.game.npcs.QuestionReceived.on(this.npcs_questionReceived.bind(this));
    this.account.game.storage.StorageStarted.on(this.storage_storageStarted.bind(this));
    this.account.game.storage.StorageLeft.on(this.storage_storageLeft.bind(this));
    this.account.game.npcs.DialogLeft.on(this.npcs_dialogLeft.bind(this));
    this.account.game.exchange.ExchangeStarted.on(this.exchange_exchangeStarted.bind(this));
    this.account.game.exchange.ExchangeLeft.on(this.exchange_exchangeLeft.bind(this));
    this.account.game.bid.StartedBuying.on(this.bid_startedBuying.bind(this));
    this.account.game.bid.StartedSelling.on(this.bid_startedSelling.bind(this));
    this.account.game.bid.BidLeft.on(this.bid_bidLeft.bind(this));
    this.account.game.managers.teleportables.UseFinished.on(this.teleportables_useFinished.bind(this));
  }

  public handleCustom(customFunction: any) {
    if (!this.account.scripts.running || this.currentCoroutine !== null) {
      return;
    }
    this.currentCoroutine = this.account.scripts.scriptManager.script.createCoroutine(customFunction);
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

  private async processCurrentAction() {
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

  private clearActions() {
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

  private map_mapChanged() {
    if (!this.account.scripts.running || !this.currentAction) {
      return;
    }

    this.mapChanged = true;
    // Reset fightsOnThisMap if the current action is not a fightAction (since a fight makes you "change the map")
    if (!(this.currentAction instanceof FightAction)) {
      this.fightsOnThisMap = 0;
    }

    // In case the bot gets into a fight (whether wanted or not)
    // Added UseAction here because the character can get aggressed in his path and
    // we need to re-run the script after it
    // Added coroutine here also because the character can get into a fight thanks to
    // a cutom function (fight() or gather() or even npc)
    if (!(this.currentAction instanceof ChangeMapAction) && !(this.currentAction instanceof FightAction) &&
      !(this.currentAction instanceof GatherAction) && !(this.currentAction instanceof UseAction) &&
      this.currentCoroutine === null) {
      return;
    }

    // WaitMapChangeAction and UseTeleportableAction handle themselves
    // so we ignore this event to not get a double-actions
    if (this.currentAction instanceof WaitMapChangeAction || this.currentAction instanceof UseTeleportableAction) {
      return;
    }

    this.clearActions();
    this.dequeueActions(1500);
  }

  private async movements_movementFinished(success: boolean) {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof FightAction) {
      if (success) {
        // Check if the bot got into a fight or not
        for (let delay = 0; delay < 10000 && this.account.state !== AccountStates.FIGHTING; delay += 500) {
          await sleep(500);
        }
        // If not, the group either moved or got stolen from us
        if (this.account.state === AccountStates.FIGHTING) {
          return;
        }
        this.dequeueActions(0);
      } else {
        this.account.scripts.stopScript();
      }
    } else if (this.currentAction instanceof ChangeMapAction && !success) {
      this.account.scripts.stopScript();
    } else if (this.currentAction instanceof MoveToCellAction) {
      if (success) {
        this.dequeueActions(0);
      } else {
        this.account.scripts.stopScript();
      }
    }
  }

  private interactives_useFinished(success: boolean) {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof UseAction || this.currentAction instanceof UseByIdAction
      || this.currentAction instanceof SaveZaapAction || this.currentAction instanceof UseLockedHouseAction) {
      if (!success) {
        this.account.scripts.stopScript();
      } else {
        this.dequeueActions(this.actionsQueue.length > 0 ? 0 : 500);
      }
    }
  }

  private fight_fightJoined() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof FightAction) {
      this.fightsCounter++;
      this.fightsOnThisMap++;
      // Log the counter only if the script says so
      // TODO: ...
      // if (this.account.scripts.scriptManager.getGlobalOr())
    }
  }

  private gathers_gatherFinished(result: GatherResults) {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof GatherAction) {
      switch (result) {
        case GatherResults.FAILED:
          this.account.scripts.stopScript("Gather failed");
          break;
        default: // GATHERED, STOLEN, BLACKLISTED, or TIMED_OUT
          this.dequeueActions(1000);
          break;
      }
    }
  }

  private gathers_gatherStarted() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof GatherAction) {
      this.gathersCounter++;
      // Log the counter only if the script says so
      // TODO: ...
      // if (this.account.scripts.scriptManager.getGlobalOr())
    }
  }

  private npcs_questionReceived() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof NpcBankAction) {
      const nba = this.currentAction as NpcBankAction;
      if (!this.account.game.npcs.reply(nba.replyId)) {
        this.account.scripts.stopScript("repy npc failed");
      }
    } else if (this.currentAction instanceof NpcAction || this.currentAction instanceof ReplyAction) {
      this.dequeueActions(400);
    }
  }

  private storage_storageStarted() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof NpcBankAction || this.currentAction instanceof UseLockedStorageAction) {
      this.dequeueActions(200);
    }
  }

  private storage_storageLeft() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof LeaveDialogAction) {
      this.dequeueActions(400);
    }
  }

  private npcs_dialogLeft() {
    if (!this.account.scripts.running) {
      return;
    }
    // Also dequeue in case it's an ReplyAction because sometimes the dialog is left without requesting it
    if (this.currentAction instanceof ReplyAction || this.currentAction instanceof LeaveDialogAction) {
      this.dequeueActions(200);
    }
  }

  private exchange_exchangeStarted() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof StartExchangeAction) {
      this.dequeueActions(400);
    }
  }

  private exchange_exchangeLeft() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof SendReadyAction || this.currentAction instanceof LeaveDialogAction) {
      this.dequeueActions(400);
    }
  }

  private bid_startedBuying() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof StartBuyingAction) {
      this.dequeueActions(400);
    }
  }

  private bid_startedSelling() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof StartSellingAction) {
      this.dequeueActions(400);
    }
  }

  private bid_bidLeft() {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof LeaveDialogAction) {
      this.dequeueActions(400);
    }
  }

  private teleportables_useFinished(success: boolean) {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof UseTeleportableAction) {
      if (success) {
        this.dequeueActions(1500);
      } else {
        this.account.scripts.stopScript(`Can't use ${(this.currentAction as UseTeleportableAction).type}`);
      }
    }
  }
}
