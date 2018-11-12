import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import { GatherResults } from "@/game/managers/gathers";
import StartBuyingAction from "@/scripts/actions/bid/StartBuyingAction";
import StartSellingAction from "@/scripts/actions/bid/StartSellingAction";
import SendReadyAction from "@/scripts/actions/exchange/SendReadyAction";
import StartExchangeAction from "@/scripts/actions/exchange/StartExchangeAction";
import FightAction from "@/scripts/actions/fight/FightAction";
import GatherAction from "@/scripts/actions/gather/GatherAction";
import LeaveDialogAction from "@/scripts/actions/global/LeaveDialogAction";
import ChangeMapAction from "@/scripts/actions/map/ChangeMapAction";
import MoveToCellAction from "@/scripts/actions/map/MoveToCellAction";
import SaveZaapAction from "@/scripts/actions/map/SaveZaapAction";
import UseAction from "@/scripts/actions/map/UseAction";
import UseByIdAction from "@/scripts/actions/map/UseByIdAction";
import UseLockedHouseAction from "@/scripts/actions/map/UseLockedHouseAction";
import UseLockedStorageAction from "@/scripts/actions/map/UseLockedStorageAction";
import UseTeleportableAction from "@/scripts/actions/map/UseTeleportableAction";
import WaitMapChangeAction from "@/scripts/actions/map/WaitMapChangeAction";
import NpcAction from "@/scripts/actions/npcs/NpcAction";
import NpcBankAction from "@/scripts/actions/npcs/NpcBankAction";
import ReplyAction from "@/scripts/actions/npcs/ReplyAction";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";
import TimerWrapper from "@/utils/TimerWrapper";
// import BuyAction from "../actions/npcs/BuyAction";

export interface IActionsManagerEventData {
  account: Account;
  mapChanged: boolean;
}

export default class ActionsManager {
  public fightsOnThisMap: number = 0;
  public monstersGroupToAttack: number = 0;
  private readonly onActionsFinished = new LiteEvent<
    IActionsManagerEventData
    >();
  private readonly onCustomHandled = new LiteEvent<IActionsManagerEventData>();
  private account: Account;
  private actionsQueue: ScriptAction[];
  private currentAction: ScriptAction | null = null;
  private currentCoroutine: Generator | null = null;
  private fightsCounter: number = 0;
  private gathersCounter: number = 0;
  private mapChanged: boolean = false;
  private timeoutTimer: TimerWrapper;

  constructor(account: Account) {
    this.account = account;
    this.actionsQueue = [];
    this.timeoutTimer = new TimerWrapper(
      this.timeoutTimerCallback,
      this,
      60000
    );

    this.account.game.map.MapChanged.on(this.map_mapChanged);
    this.account.game.managers.movements.MovementFinished.on(
      this.movements_movementFinished
    );
    this.account.game.managers.interactives.UseFinished.on(
      this.interactives_useFinished
    );
    this.account.game.fight.FightJoined.on(this.fight_fightJoined);
    this.account.game.managers.gathers.GatherFinished.on(
      this.gathers_gatherFinished
    );
    this.account.game.managers.gathers.GatherStarted.on(
      this.gathers_gatherStarted
    );
    this.account.game.npcs.QuestionReceived.on(this.npcs_questionReceived);
    this.account.game.storage.StorageStarted.on(this.storage_storageStarted);
    this.account.game.storage.StorageLeft.on(this.storage_storageLeft);
    this.account.game.npcs.DialogLeft.on(this.npcs_dialogLeft);
    this.account.game.exchange.ExchangeStarted.on(
      this.exchange_exchangeStarted
    );
    this.account.game.exchange.ExchangeLeft.on(this.exchange_exchangeLeft);
    this.account.game.bid.StartedBuying.on(this.bid_startedBuying);
    this.account.game.bid.StartedSelling.on(this.bid_startedSelling);
    this.account.game.bid.BidLeft.on(this.bid_bidLeft);
    this.account.game.managers.teleportables.UseFinished.on(
      this.teleportables_useFinished
    );
  }

  public get ActionsFinished() {
    return this.onActionsFinished.expose();
  }

  public get CustomHandled() {
    return this.onCustomHandled.expose();
  }

  public async handleCustom(customFunction: GeneratorFunction) {
    if (!this.account.scripts.running || this.currentCoroutine) {
      return;
    }
    this.currentCoroutine = customFunction();
    await this.processCoroutine();
  }

  public async enqueueAction(
    action: ScriptAction,
    startDequeuingActions = false
  ) {
    this.actionsQueue.push(action);
    if (startDequeuingActions) {
      await this.dequeueActions(0);
    }

    // If this account is a group chief, enqueue the action to the others members
    // Special case: if there is a coroutine currently being handled, ignore this
    if (this.account.hasGroup && this.account.isGroupChief) {
      this.account.group!.enqueueActionToMembers(action, startDequeuingActions);
    }
  }

  public clearEverything() {
    // Clear all actions in the queue
    this.clearActions();
    this.currentAction = null;
    this.currentCoroutine = null;
    this.timeoutTimer.stop();
    // TODO: Ask the users if they want to leave the main counters
    this.fightsCounter = 0;
    this.gathersCounter = 0;
    this.fightsOnThisMap = 0;
  }

  public async dequeueActions(delay: number) {
    if (this.account && this.account.scripts.running === false) {
      return;
    }
    if (this.timeoutTimer.enabled) {
      this.timeoutTimer.stop();
    }
    if (delay > 0) {
      await sleep(delay);
    }
    this.account.logger.logDebug(
      LanguageManager.trans("scripts"),
      LanguageManager.trans("waitedMs", delay)
    );
    // If the queue still have actions
    if (this.actionsQueue.length > 0) {
      this.currentAction = this.actionsQueue.shift() || null;
      await this.processCurrentAction();
    } else {
      // If there is a coroutine currently being handled, process it
      // Otherwise tell the scripts manager that we're done
      if (this.currentCoroutine) {
        await this.processCoroutine();
      } else {
        this.actionsFinished();
      }
    }
  }

  private async processCoroutine() {
    if (!this.account.scripts.running) {
      return;
    }
    try {
      const name = this.currentAction
        ? this.currentAction._name
        : LanguageManager.trans("unknown");
      if (!this.currentCoroutine) {
        // TODO: ??
        return;
      }
      const result = await this.currentCoroutine.next();
      this.account.logger.logDebug(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("processingCoroutine", name, result.done)
      );
      if (result.done) {
        this.account.logger.logDebug(
          LanguageManager.trans("scripts"),
          LanguageManager.trans("endingCoroutine")
        );
        this.customHandled();
      }
    } catch (error) {
      this.account.scripts.stopScript(error);
    }
  }

  private async processCurrentAction() {
    if (!this.account.scripts.running || !this.currentAction) {
      return;
    }
    const type = this.currentAction._name;
    this.account.logger.logDebug(
      LanguageManager.trans("actionsManager"),
      LanguageManager.trans("currentAction", type)
    );
    const res = await this.currentAction.process(this.account);
    switch (res) {
      case ScriptActionResults.DONE:
        this.account.logger.logDebug(
          LanguageManager.trans("actionsManager"),
          LanguageManager.trans("actionDone", type)
        );
        await this.dequeueActions(100);
        break;
      case ScriptActionResults.FAILED:
        this.account.logger.logDebug(
          LanguageManager.trans("actionsManager"),
          LanguageManager.trans("actionFailed", type)
        );
        break;
      case ScriptActionResults.PROCESSING:
        this.timeoutTimer.start();
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
      this.onActionsFinished.trigger({
        account: this.account,
        mapChanged: true
      });
    } else {
      this.onActionsFinished.trigger({
        account: this.account,
        mapChanged: false
      });
    }
  }

  private customHandled() {
    this.currentCoroutine = null;
    if (this.mapChanged) {
      this.mapChanged = false;
      this.onCustomHandled.trigger({ account: this.account, mapChanged: true });
    } else {
      this.onCustomHandled.trigger({
        account: this.account,
        mapChanged: false
      });
    }
  }

  private map_mapChanged = async () => {
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
    if (
      !(this.currentAction instanceof ChangeMapAction) &&
      !(this.currentAction instanceof FightAction) &&
      !(this.currentAction instanceof GatherAction) &&
      !(this.currentAction instanceof UseAction) &&
      this.currentCoroutine === null
    ) {
      return;
    }

    // WaitMapChangeAction and UseTeleportableAction handle themselves
    // so we ignore this event to not get a double-actions
    if (
      this.currentAction instanceof WaitMapChangeAction ||
      this.currentAction instanceof UseTeleportableAction
    ) {
      return;
    }

    this.clearActions();
    await this.dequeueActions(1500);
  };

  private movements_movementFinished = async (success?: boolean) => {
    if (!this.account.scripts.running) {
      return;
    }
    if (
      this.currentAction instanceof FightAction &&
      this.monstersGroupToAttack !== 0
    ) {
      if (success) {
        this.account.network.sendMessageFree(
          "GameRolePlayAttackMonsterRequestMessage",
          {
            monsterGroupId: this.monstersGroupToAttack
          }
        );
        // Check if the bot got into a fight or not
        for (
          let delay = 0;
          delay < 10000 && this.account.state !== AccountStates.FIGHTING;
          delay += 500
        ) {
          await sleep(500);
        }
        // If not, the group either moved or got stolen from us
        if (this.account.state !== AccountStates.FIGHTING) {
          this.account.logger.logWarning(
            LanguageManager.trans("scripts"),
            LanguageManager.trans("errorLaunchFight")
          );
          await this.dequeueActions(0);
        }

        this.monstersGroupToAttack = 0;
      } else {
        this.account.scripts.stopScript();
      }
    } else if (this.currentAction instanceof ChangeMapAction && !success) {
      this.account.scripts.stopScript();
    } else if (this.currentAction instanceof MoveToCellAction) {
      if (success) {
        await this.dequeueActions(0);
      } else {
        this.account.scripts.stopScript();
      }
    }
  };

  private interactives_useFinished = async (success?: boolean) => {
    if (!this.account.scripts.running) {
      return;
    }
    if (
      this.currentAction instanceof UseAction ||
      this.currentAction instanceof UseByIdAction ||
      this.currentAction instanceof SaveZaapAction ||
      this.currentAction instanceof UseLockedHouseAction
    ) {
      if (!success) {
        this.account.scripts.stopScript();
      } else {
        await this.dequeueActions(this.actionsQueue.length > 0 ? 0 : 500);
      }
    }
  };

  private fight_fightJoined = () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof FightAction) {
      this.timeoutTimer.stop();

      this.fightsCounter++;
      this.fightsOnThisMap++;
      // Log the counter only if the script says so
      const display = this.account.scripts.scriptManager.config
        .DISPLAY_FIGHT_COUNT
        ? this.account.scripts.scriptManager.config.DISPLAY_FIGHT_COUNT
        : false;
      if (display) {
        this.account.logger.logInfo(
          LanguageManager.trans("scripts"),
          LanguageManager.trans("fightNumber", this.fightsCounter)
        );
      }
    }
  };

  private gathers_gatherFinished = async (result?: GatherResults) => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof GatherAction) {
      switch (result) {
        case GatherResults.FAILED:
          this.account.scripts.stopScript(
            LanguageManager.trans("gatherFailed")
          );
          break;
        default:
          // GATHERED, STOLEN, BLACKLISTED, or TIMED_OUT
          await this.dequeueActions(1000);
          break;
      }
    }
  };

  private gathers_gatherStarted = () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof GatherAction) {
      this.gathersCounter++;
      // Log the counter only if the script says so
      const displayGatherCount = this.account.scripts.scriptManager.config
        .DISPLAY_GATHER_COUNT
        ? this.account.scripts.scriptManager.config.DISPLAY_GATHER_COUNT
        : false;
      if (displayGatherCount) {
        this.account.logger.logInfo(
          LanguageManager.trans("scripts"),
          LanguageManager.trans("gatherNumber", this.gathersCounter)
        );
      }
    }
  };

  private npcs_questionReceived = async () => {
    if (!this.account.scripts.running) {
      return;
    }

    if (this.currentAction instanceof NpcBankAction) {
      const nba = this.currentAction as NpcBankAction;
      if (!this.account.game.npcs.reply(nba.replyId)) {
        this.account.scripts.stopScript(
          LanguageManager.trans("replyNpcFailed")
        );
      }
    } else if (
      this.currentAction instanceof NpcAction ||
      this.currentAction instanceof ReplyAction
    ) {
      await this.dequeueActions(400);
    }
  };

  private storage_storageStarted = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (
      this.currentAction instanceof NpcBankAction ||
      this.currentAction instanceof UseLockedStorageAction
    ) {
      await this.dequeueActions(200);
    }
  };

  private storage_storageLeft = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof LeaveDialogAction) {
      await this.dequeueActions(400);
    }
  };

  private npcs_dialogLeft = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    // Also dequeue in case it's an ReplyAction because sometimes the dialog is left without requesting it
    if (
      this.currentAction instanceof ReplyAction ||
      this.currentAction instanceof LeaveDialogAction
    ) {
      await this.dequeueActions(200);
    }
  };

  private exchange_exchangeStarted = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof StartExchangeAction) {
      await this.dequeueActions(400);
    }
  };

  private exchange_exchangeLeft = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (
      this.currentAction instanceof SendReadyAction ||
      this.currentAction instanceof LeaveDialogAction
    ) {
      await this.dequeueActions(400);
    }
  };

  private bid_startedBuying = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof StartBuyingAction) {
      await this.dequeueActions(400);
    }
  };

  private bid_startedSelling = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof StartSellingAction) {
      await this.dequeueActions(400);
    }
  };

  private bid_bidLeft = async () => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof LeaveDialogAction) {
      await this.dequeueActions(400);
    }
  };

  private teleportables_useFinished = async (success?: boolean) => {
    if (!this.account.scripts.running) {
      return;
    }
    if (this.currentAction instanceof UseTeleportableAction) {
      if (success) {
        await this.dequeueActions(1500);
      } else {
        this.account.scripts.stopScript(
          LanguageManager.trans(
            "cantUseTeleportable",
            (this.currentAction as UseTeleportableAction).type
          )
        );
      }
    }
  };

  private async timeoutTimerCallback() {
    // Running and not Enabled because during fights, the script is paused
    if (!this.account.scripts.running) {
      return;
    }
    this.account.logger.logWarning(
      LanguageManager.trans("scripts"),
      LanguageManager.trans("timedOut")
    );
    this.account.scripts.stopScript();
    await this.account.scripts.startScript();
  }
}
