import Account from "@/account";

export default class QuestsFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "QuestStartedMessage",
      this.HandleQuestStartedMessage,
      this
    );
    this.account.dispatcher.register(
      "QuestStepInfoMessage",
      this.HandleQuestStepInfoMessage,
      this
    );
    this.account.dispatcher.register(
      "QuestStepValidatedMessage",
      this.HandleQuestStepValidatedMessage,
      this
    );
    this.account.dispatcher.register(
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
