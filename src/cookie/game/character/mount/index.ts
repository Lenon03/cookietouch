import Account from "@/account";
import MountRidingMessage from "@/protocol/network/messages/MountRidingMessage";
import MountSetMessage from "@/protocol/network/messages/MountSetMessage";
import MountXpRatioMessage from "@/protocol/network/messages/MountXpRatioMessage";
import MountClientData from "@/protocol/network/types/MountClientData";
import IClearable from "@/utils/IClearable";

export default class Mount implements IClearable {
  public hasMount: boolean = false;
  public isRiding: boolean = false;
  public currentRatio: number = 0;
  public data: MountClientData | undefined;
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public toggleRiding() {
    if (!this.hasMount) {
      return;
    }

    this.account.network.sendMessageFree("MountToggleRidingMessage");
  }

  public setRatio(ratio: number) {
    if (!this.hasMount) {
      return;
    }

    this.account.network.sendMessageFree("MountSetXpRatioRequestMessage", {
      xpRatio: ratio
    });
  }

  public clear() {
    this.hasMount = false;
    this.isRiding = false;
  }

  public UpdateMountSetMessage(message: MountSetMessage) {
    this.hasMount = true;
    this.data = message.mountData;
  }

  public UpdateMountRidingMessage(message: MountRidingMessage) {
    this.isRiding = message.isRiding;
  }

  public UpdateMountXpRatioMessage(message: MountXpRatioMessage) {
    this.currentRatio = message.ratio;
  }
}
