import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";

export default class QueueFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "QueueStatusMessage",
      this.HandleQueueStatusMessage,
      this
    );
    this.account.dispatcher.register(
      "LoginQueueStatusMessage",
      this.HandleLoginQueueStatusMessage,
      this
    );
  }

  private async HandleQueueStatusMessage(account: Account, data: any) {
    this.account.logger.logDofus(
      "GameQueue",
      LanguageManager.trans("queueMessage", data.position, data.total)
    );
  }

  private async HandleLoginQueueStatusMessage(account: Account, data: any) {
    this.account.logger.logDofus(
      "LoginQueue",
      LanguageManager.trans("queueMessage", data.position, data.total)
    );
  }
}
