import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { PlayerLifeStatusEnum } from "@protocol/enums/PlayerLifeStatusEnum";
import Dictionary from "@utils/Dictionary";
import ResetEvent, { IToken } from "@utils/ResetEvent";
import { sleep } from "@utils/Time";
import { List } from "linqts";
import FightAction from "../scripts/actions/fight/FightAction";
import ScriptAction from "../scripts/actions/ScriptAction";
import Grouping from "./Grouping";

export interface IAccountGroup {
  account: Account;
  event: ResetEvent;
}

export default class Group {
  public chief: Account;
  public members: List<Account>;

  private _grouping: Grouping;
  private _membersAccountsFinished: IAccountGroup[];

  constructor(chief: Account) {
    this._grouping = new Grouping(this);
    this._membersAccountsFinished = [];
    this.chief = chief;
    this.members = new List<Account>();

    chief.group = this;
    chief.game.fight.FightIDReceived.on(this.chiefFightIdReceived.bind(this));
    chief.RecaptchaResolved.on(this.accountRecaptchaResolved.bind(this));
  }

  public addMember(member: Account) {
    if (this.members.Count() >= 7) {
      return;
    }

    member.group = this;
    this.members.Add(member);
    this._membersAccountsFinished.push({ account: member, event: new ResetEvent(false) });
    member.scripts.actionsManager.ActionsFinished.on(this.memberActionsFinished.bind(this));
    member.RecaptchaResolved.on(this.accountRecaptchaResolved.bind(this));
  }

  public connect() {
    this.chief.start();
    this.members.ForEach((t: Account) => {
      t.start();
    });
  }

  public disconnect() {
    this.chief.stop();
    this.members.ForEach((t: Account) => {
      t.stop();
    });
  }

  public membersCleaningAndClearing() {
    this.members.ForEach((t: Account) => {
      t.game.managers.gathers.cancelGather();
      t.game.managers.interactives.cancelUse();
      t.scripts.actionsManager.clearEverything();
    });
  }

  get isAnyoneBusy() {
    return this.chief.isBusy || this.members.Any((m: Account) => m.isBusy);
  }

  get isAnyoneFullWeight() {
    const maxPods = this.chief.scripts.scriptManager.config.MAX_PODS ? this.chief.scripts.scriptManager.config.MAX_PODS : 90;
    if (this.chief.game.character.inventory.weightPercent >= maxPods) {
      return true;
    }
    return this.members.Any((t: Account) => t.game.character.inventory.weightPercent >= maxPods);
  }

  get isEveryoneAliveAndKicking() {
    if (this.chief.game.character.lifeStatus !== PlayerLifeStatusEnum.STATUS_ALIVE_AND_KICKING) {
      return false;
    }
    return this.members.All((t: Account) => t.game.character.lifeStatus === PlayerLifeStatusEnum.STATUS_ALIVE_AND_KICKING);
  }

  public async applyCheckings() {
    await this.chief.scripts.applyCheckings();

    const task = async (m: Account) => {
      await m.scripts.applyCheckings();
    };

    const test = this.members.ToArray().map((m) => task(m));

    await Promise.all(test);
  }

  public isGroupMember(playerId: number): boolean {
    return this.members.FirstOrDefault((m) => m.game.character.id === playerId) !== null;
  }

  public async regroupMembersIfNeeded() {
    if (this.members.All((m: Account) => m.game.map.currentPosition === this.chief.game.map.currentPosition)) {
      return;
    }
    await this._grouping.groupMembers();
  }

  public async waitForMembersToJoinFight() {
    while (this.members.Any((m) => m.state !== AccountStates.FIGHTING) && !this.chief.game.fight.isFightStarted) {
      // Waiting for members to join the fight...
      await sleep(1000);
    }
  }

  public signalMembersToJoinFight() {
    if (this.chief.state !== AccountStates.FIGHTING) {
      return;
    }
    this.members.ForEach((t) => {
      if (t.state !== AccountStates.FIGHTING) {
        t.network.sendMessageFree("GameFightJoinRequestMessage", {
          fighterId: this.chief.game.character.id,
          figthId: this.chief.game.fight.fightId,
        });
      }
    });
  }

  public enqueueActionToMembers(action: ScriptAction, startDequeueingAction: boolean = false) {
    // Avoid enqueueing a fight action to group members, since they will be joining the chief
    if (action instanceof FightAction) {
      // We will also set the reset events so that the chief continues the script after the fight
      // Since the members don't get this action, ActionsFinished never gets fired
      this.members.ForEach((m) => {
        const test = this._membersAccountsFinished.find((e) => e.account === m);
        if (test !== undefined) {
          test.event.set();
        }
      });
      return;
    }

    this.members.ForEach((t) => {
      t.scripts.actionsManager.enqueueAction(action, startDequeueingAction);
    });

    // Reset all ResetEvents of the members if this action will start dequeueing actions
    if (!startDequeueingAction) { return; }
    this.members.ForEach((m) => {
      const test = this._membersAccountsFinished.find((e) => e.account === m);
      if (test !== undefined) {
        test.event.reset();
      }
    });
  }

  public waitForAllActionsFinished() {
    const events = this._membersAccountsFinished.map((m) => m.event);
    const tasks: IToken[] = [];

    for (const e of events) {
      tasks.push(e.wait(async () => {/**/}));
    }

    Promise.all(tasks.map((t) => t.callback)); // TODO: Check this
  }

  private chiefFightIdReceived() {
    this.signalMembersToJoinFight();
  }

  private memberActionsFinished(data: { account: Account, mapChanged: boolean }) {
    data.account.logger.logDebug(LanguageManager.trans("group"), LanguageManager.trans("finishedActions"));
    const test = this._membersAccountsFinished.find((e) => e.account === data.account);
    if (test !== undefined) {
      test.event.set();
    }
  }

  private async accountRecaptchaResolved(data: { account: Account, success: boolean }) {
    if (!data.success) {
      return;
    }
    // Check if this was the last member that got the captcha
    // If yes, we need to re-start the script
    if (this.isAnyoneBusy) {
      return;
    }

    await sleep(2000);
    this.chief.scripts.startScript();
  }
}
