import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import QuestStartedMessage from "@/protocol/network/messages/QuestStartedMessage";
import QuestStepInfoMessage from "@/protocol/network/messages/QuestStepInfoMessage";
import QuestStepValidatedMessage from "@/protocol/network/messages/QuestStepValidatedMessage";
import QuestValidatedMessage from "@/protocol/network/messages/QuestValidatedMessage";

export default class QuestsFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "QuestStartedMessage",
      this.HandleQuestStartedMessage,
      this
    );
    Frames.dispatcher.register(
      "QuestStepInfoMessage",
      this.HandleQuestStepInfoMessage,
      this
    );
    Frames.dispatcher.register(
      "QuestStepValidatedMessage",
      this.HandleQuestStepValidatedMessage,
      this
    );
    Frames.dispatcher.register(
      "QuestValidatedMessage",
      this.HandleQuestValidatedMessage,
      this
    );
  }

  private async HandleQuestStartedMessage(
    account: Account,
    message: QuestStartedMessage
  ) {
    account.extensions.characterCreation.UpdateQuestStartedMessage(message);
  }

  private async HandleQuestStepInfoMessage(
    account: Account,
    message: QuestStepInfoMessage
  ) {
    account.extensions.characterCreation.UpdateQuestStepInfoMessage(message);
  }

  private async HandleQuestStepValidatedMessage(
    account: Account,
    message: QuestStepValidatedMessage
  ) {
    account.extensions.characterCreation.UpdateQuestStepValidatedMessage(
      message
    );
  }

  private async HandleQuestValidatedMessage(
    account: Account,
    message: QuestValidatedMessage
  ) {
    account.extensions.characterCreation.UpdateQuestValidatedMessage(message);
  }
}
