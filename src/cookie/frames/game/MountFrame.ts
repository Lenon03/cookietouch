import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import MountRidingMessage from "@/protocol/network/messages/MountRidingMessage";
import MountSetMessage from "@/protocol/network/messages/MountSetMessage";
import MountXpRatioMessage from "@/protocol/network/messages/MountXpRatioMessage";

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

  private async HandleMountXpRatioMessage(
    account: Account,
    message: MountXpRatioMessage
  ) {
    await account.game.character.mount.UpdateMountXpRatioMessage(message);
  }

  private async HandleMountRidingMessage(
    account: Account,
    message: MountRidingMessage
  ) {
    await account.game.character.mount.UpdateMountRidingMessage(message);
  }

  private async HandleMountSetMessage(
    account: Account,
    message: MountSetMessage
  ) {
    await account.game.character.mount.UpdateMountSetMessage(message);
  }
}
