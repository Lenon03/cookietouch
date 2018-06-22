import Account from "@/account";

export default class NpcsFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "NpcDialogCreationMessage",
      this.HandleNpcDialogCreationMessage,
      this
    );
    this.account.dispatcher.register(
      "NpcDialogQuestionMessage",
      this.HandleNpcDialogQuestionMessage,
      this
    );
    this.account.dispatcher.register(
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
