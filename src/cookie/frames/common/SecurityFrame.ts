import Account from "../../Account";

export default class SecurityFrame {

  private account: Account;
  private sequenceNumber: number = 0;

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
    this.sequenceNumber++;
    account.network.sendMessage("SequenceNumberMessage", {
      number: this.sequenceNumber,
    });
  }

  private async HandleTextInformationMessage(account: Account, data: any) {
    if (data.msgId === 245) {
      console.log("Vous avez atteint la limite de combat journalière.");
    }
  }

  private async HandleAccountLoggingKickedMessage(account: Account, data: any) {
    console.log(`Vous êtes kick encore pour ${data.days} jours, ${data.hours}, et ${data.minutes} minutes.`);
  }
}
