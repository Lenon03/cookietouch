import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { PlayerLifeStatusEnum } from "@protocol/enums/PlayerLifeStatusEnum";
import Dictionary from "@utils/Dictionary";
import { Mutex } from "@utils/Semaphore";
import { sleep } from "@utils/Time";
import { List } from "linqts";
import Grouping from "./Grouping";

export interface IAccountGroup {
  account: Account;
  event: Mutex;
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
    this._membersAccountsFinished.push({account: member, event: new Mutex()});
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

  public membersCleaningAndClearing() {
    this.members.ForEach((t: Account) => {
      t.game.managers.gathers.cancelGather();
      t.game.managers.interactives.cancelUse();
      // t.scripts.actionsManager.clearEverything();
    });
  }

  get isAnyoneBusy() {
    return this.chief.isBusy || this.members.Any((m: Account) => m.isBusy);
  }

  get isAnyoneFullWeight() {
    // const maxPods = this.chief.scripts.scriptManager.getGlobalOr("MAX_PODS", 90);
    const maxPods = 90;
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
    // await this.chief.scripts.applyCheckings();

    const task = async (m: Account) => {
      // await m.scripts.applyCheckings();
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
        t.network.sendMessage("GameFightJoinRequestMessage", {
          fighterId: this.chief.game.character.id,
          figthId: this.chief.game.fight.fightId,
        });
      }
    });
  }

  // public enqueueActionToMembers(action: ScriptAction, startDequeuingAction: boolean = false) {
  //   //
  // }
  //
  // public waitForAllActionsFinished() {
  //   // TODO: ....
  // }

  private chiefFightIdReceived() {
    this.signalMembersToJoinFight();
  }

  private memberActionsFinished(data: {account: Account, mapChanged: boolean}) {
    data.account.logger.logDebug("Group", "I finished my actions.");
    const test = this._membersAccountsFinished.find((e) => e.account === data.account);
    if (test !== undefined) {
      const release = test.event.acquire();
    }
  }

  private async accountRecaptchaResolved(data: {account: Account, success: boolean}) {
    if (!data.success) {
      return;
    }
    if (this.isAnyoneBusy) {
      return;
    }
    await sleep(2000);
    this.chief.scripts.startScript();
  }
}
