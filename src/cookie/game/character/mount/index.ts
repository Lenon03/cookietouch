import Account from "@account";

export default class Mount {
  public hasMount: boolean;
  public isRiding: boolean;
  public currentRatio: number;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public toggleRiding() {
    if (!this.hasMount) {
      return;
    }

    this.account.network.sendMessage("MountToggleRidingMessage");
  }

  public setRatio(ratio: number) {
    if (!this.hasMount) {
      return;
    }

    this.account.network.sendMessage("MountSetXpRatioRequestMessage", {
      xpRatio: ratio,
    });
  }

  public UpdateMountSetMessage(message: any) {
    this.hasMount = true;
  }

  public UpdateMountRidingMessage(message: any) {
    this.isRiding = message.isRiding;
  }

  public UpdateMountXpRatioMessage(message: any) {
    this.currentRatio = message.ratio;
  }
}
