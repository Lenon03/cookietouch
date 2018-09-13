import Account from "@/account";
import Frames, { IFrame } from "@/frames";

export default class MountFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "MountXpRatioMessage",
      this.HandleMountXpRatioMessage,
      this
    );
    Frames.dispatcher.register(
      "MountRidingMessage",
      this.HandleMountRidingMessage,
      this
    );
    Frames.dispatcher.register(
      "MountSetMessage",
      this.HandleMountSetMessage,
      this
    );
  }

  private async HandleMountXpRatioMessage(account: Account, message: any) {
    await account.game.character.mount.UpdateMountXpRatioMessage(message);
  }

  private async HandleMountRidingMessage(account: Account, message: any) {
    await account.game.character.mount.UpdateMountRidingMessage(message);
  }

  private async HandleMountSetMessage(account: Account, message: any) {
    await account.game.character.mount.UpdateMountSetMessage(message);
  }
}
