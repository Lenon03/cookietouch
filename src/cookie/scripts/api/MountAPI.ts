import Account from "@/account";
import SetRatioAction from "@/scripts/actions/mount/SetRatioAction";
import ToggleRidingAction from "@/scripts/actions/mount/ToggleRidingAction";

export default class MountAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public hasMount(): boolean {
    return this.account.game.character.mount.hasMount;
  }

  public isRiding(): boolean {
    return this.account.game.character.mount.isRiding;
  }

  public currentRatio(): number {
    if (!this.account.game.character.mount.hasMount) {
      return -1;
    }
    return this.account.game.character.mount.currentRatio;
  }

  public currentLevel(): number {
    if (!this.account.game.character.mount.hasMount) {
      return -1;
    }
    return this.account.game.character.mount.data!.level;
  }

  public async toggleRiding(): Promise<boolean> {
    if (!this.account.game.character.mount.hasMount) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new ToggleRidingAction()
    );
    return true;
  }

  public async setRatio(ratio: number): Promise<boolean> {
    if (ratio > 90 || !this.account.game.character.mount.hasMount) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new SetRatioAction(ratio)
    );
    return true;
  }
}
