import Account from "@account";
import SetRatioAction from "../actions/mount/SetRatioAction";
import ToggleRidingAction from "../actions/mount/ToggleRidingAction";

export default class MountAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public get hasMount(): boolean {
    return this.account.game.character.mount.hasMount;
  }

  public get isRiding(): boolean {
    return this.account.game.character.mount.isRiding;
  }

  public get currentRatio(): number {
    return this.account.game.character.mount.currentRatio;
  }

  public toggleRiding(): boolean {
    if (!this.account.game.character.mount.hasMount) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new ToggleRidingAction());
    return true;
  }

  public setRatio(ratio: number): boolean {
    if (ratio > 100 || !this.account.game.character.mount.hasMount) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new SetRatioAction(ratio));
    return true;
  }
}
