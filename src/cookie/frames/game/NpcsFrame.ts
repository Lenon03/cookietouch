import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import LeaveDialogMessage from "@/protocol/network/messages/LeaveDialogMessage";
import NpcDialogCreationMessage from "@/protocol/network/messages/NpcDialogCreationMessage";
import NpcDialogQuestionMessage from "@/protocol/network/messages/NpcDialogQuestionMessage";
import ExchangeStartOkNpcShopMessage from "@/protocol/network/messages/ExchangeStartOkNpcShopMessage";
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
    Frames.dispatcher.register(
      "ExchangeStartOkNpcShopMessage",
      this.HandleExchangeStartOkNpcShopMessage,
      this
    );
  }

  private async HandleNpcDialogCreationMessage(
    account: Account,
    message: NpcDialogCreationMessage
  ) {
    account.game.npcs.UpdateNpcDialogCreationMessage(message);
  }

  private async HandleExchangeStartOkNpcShopMessage(
    account: Account,
    message: ExchangeStartOkNpcShopMessage
  ) {
    account.game.npcs.UpdateNpcShopMessage(message);
  }
  private async HandleNpcDialogQuestionMessage(
    account: Account,
    message: NpcDialogQuestionMessage
  ) {
    account.game.npcs.UpdateNpcDialogQuestionMessage(message);
  }

  private async HandleLeaveDialogMessage(
    account: Account,
    message: LeaveDialogMessage
  ) {
    account.game.npcs.UpdateLeaveDialogMessage(message);
  }
}
