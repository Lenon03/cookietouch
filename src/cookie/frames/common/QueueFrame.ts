import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";
import LoginQueueStatusMessage from "@/protocol/network/messages/LoginQueueStatusMessage";
import QueueStatusMessage from "@/protocol/network/messages/QueueStatusMessage";

export default class QueueFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "QueueStatusMessage",
      this.HandleQueueStatusMessage,
      this
    );
    Frames.dispatcher.register(
      "LoginQueueStatusMessage",
      this.HandleLoginQueueStatusMessage,
      this
    );
  }

  private async HandleQueueStatusMessage(
    account: Account,
    data: QueueStatusMessage
  ) {
    account.logger.logDofus(
      "GameQueue",
      LanguageManager.trans("queueMessage", data.position, data.total)
    );
  }

  private async HandleLoginQueueStatusMessage(
    account: Account,
    data: LoginQueueStatusMessage
  ) {
    account.logger.logDofus(
      "LoginQueue",
      LanguageManager.trans("queueMessage", data.position, data.total)
    );
  }
}
