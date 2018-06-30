import Account from "@/account";
import Frames, { IFrame } from "@/frames";

export default class NpcsFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "NpcDialogCreationMessage",
      this.HandleNpcDialogCreationMessage,
      this
    );
    Frames.dispatcher.register(
      "NpcDialogQuestionMessage",
      this.HandleNpcDialogQuestionMessage,
      this
    );
    Frames.dispatcher.register(
      "LeaveDialogMessage",
      this.HandleLeaveDialogMessage,
      this
    );
  }

  private async HandleNpcDialogCreationMessage(account: Account, message: any) {
    account.game.npcs.UpdateNpcDialogCreationMessage(message);
  }

  private async HandleNpcDialogQuestionMessage(account: Account, message: any) {
    account.game.npcs.UpdateNpcDialogQuestionMessage(message);
  }

  private async HandleLeaveDialogMessage(account: Account, message: any) {
    account.game.npcs.UpdateLeaveDialogMessage(message);
  }
}
