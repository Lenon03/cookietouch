import Account from "@/account";
import Frames, { IFrame } from "@/frames";

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

  private async HandleQuestStartedMessage(account: Account, message: any) {
    account.extensions.characterCreation.UpdateQuestStartedMessage(message);
  }

  private async HandleQuestStepInfoMessage(account: Account, message: any) {
    account.extensions.characterCreation.UpdateQuestStepInfoMessage(message);
  }

  private async HandleQuestStepValidatedMessage(
    account: Account,
    message: any
  ) {
    account.extensions.characterCreation.UpdateQuestStepValidatedMessage(
      message
    );
  }

  private async HandleQuestValidatedMessage(account: Account, message: any) {
    account.extensions.characterCreation.UpdateQuestValidatedMessage(message);
  }
}
