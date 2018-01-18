import Account from "@account";

export default class StorageFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("ExchangeStartedWithStorageMessage", this.HandleExchangeStartedWithStorageMessage, this);
    this.account.dispatcher.register("StorageInventoryContentMessage", this.HandleStorageInventoryContentMessage, this);
    this.account.dispatcher.register("StorageKamasUpdateMessage", this.HandleStorageKamasUpdateMessage, this);
    this.account.dispatcher.register("StorageObjectUpdateMessage", this.HandleStorageObjectUpdateMessage, this);
    this.account.dispatcher.register("StorageObjectRemoveMessage", this.HandleStorageObjectRemoveMessage, this);
    this.account.dispatcher.register("StorageObjectsUpdateMessage", this.HandleStorageObjectsUpdateMessage, this);
    this.account.dispatcher.register("StorageObjectsRemoveMessage", this.HandleStorageObjectsRemoveMessage, this);
    this.account.dispatcher.register("ExchangeLeaveMessage", this.HandleExchangeLeaveMessage, this);
  }

  private async HandleExchangeStartedWithStorageMessage(account: Account, message: any) {
    account.game.storage.UpdateExchangeStartedWithStorageMessage(message);
  }

  private async HandleStorageInventoryContentMessage(account: Account, message: any) {
    account.game.storage.UpdateStorageInventoryContentMessage(message);
  }

  private async HandleStorageKamasUpdateMessage(account: Account, message: any) {
    account.game.storage.UpdateStorageKamasUpdateMessage(message);
  }

  private async HandleStorageObjectUpdateMessage(account: Account, message: any) {
    account.game.storage.UpdateStorageObjectUpdateMessage(message);
  }

  private async HandleStorageObjectRemoveMessage(account: Account, message: any) {
    account.game.storage.UpdateStorageObjectRemoveMessage(message);
  }

  private async HandleStorageObjectsUpdateMessage(account: Account, message: any) {
    account.game.storage.UpdateStorageObjectsUpdateMessage(message);
  }

  private async HandleStorageObjectsRemoveMessage(account: Account, message: any) {
    account.game.storage.UpdateStorageObjectsRemoveMessage(message);
  }

  private async HandleExchangeLeaveMessage(account: Account, message: any) {
    account.game.storage.UpdateExchangeLeaveMessage(message);
  }
}
