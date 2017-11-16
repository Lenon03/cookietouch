import Account from "@account";

export default class QueueFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("QueueStatusMessage", this.HandleQueueStatusMessage, this);
    this.account.dispatcher.register("LoginQueueStatusMessage", this.HandleLoginQueueStatusMessage, this);
  }

  private async HandleQueueStatusMessage(account: Account, data: any) {
    console.log(`[Queue] Vous êtes dans la position ${data.position} sur ${data.total} dans la file d'attente.`);
  }

  private async HandleLoginQueueStatusMessage(account: Account, data: any) {
    console.log(`[LoginQueue] Vous êtes dans la position ${data.position} sur ${data.total} dans la file d'attente.`);
  }
}
