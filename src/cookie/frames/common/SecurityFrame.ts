import Account from "@account";

export default class SecurityFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("SequenceNumberRequestMessage", this.HandleSequenceNumberRequestMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
    this.account.dispatcher.register("AccountLoggingKickedMessage", this.HandleAccountLoggingKickedMessage, this);
  }

  private async HandleSequenceNumberRequestMessage(account: Account, data: any) {
    account.framesData.sequence++;
    account.network.sendMessage("SequenceNumberMessage", {
      number: account.framesData.sequence,
    });
  }

  private async HandleTextInformationMessage(account: Account, data: any) {
    if (data.msgId === 245) {
      this.account.logger.logDebug("", "Vous avez atteint la limite de combat journalière.");
    }
  }

  private async HandleAccountLoggingKickedMessage(account: Account, data: any) {
    this.account.logger
      .logDebug("", `Vous êtes kick encore pour ${data.days} jours, ${data.hours}, et ${data.minutes} minutes.`);
  }
}
