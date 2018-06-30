import Account from "@/account";
import Frames, { IFrame } from "@/frames";

export default class StorageFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ExchangeStartedWithStorageMessage",
      this.HandleExchangeStartedWithStorageMessage,
      this
    );
    Frames.dispatcher.register(
      "StorageInventoryContentMessage",
      this.HandleStorageInventoryContentMessage,
      this
    );
    Frames.dispatcher.register(
      "StorageKamasUpdateMessage",
      this.HandleStorageKamasUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "StorageObjectUpdateMessage",
      this.HandleStorageObjectUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "StorageObjectRemoveMessage",
      this.HandleStorageObjectRemoveMessage,
      this
    );
    Frames.dispatcher.register(
      "StorageObjectsUpdateMessage",
      this.HandleStorageObjectsUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "StorageObjectsRemoveMessage",
      this.HandleStorageObjectsRemoveMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeLeaveMessage",
      this.HandleExchangeLeaveMessage,
      this
    );
  }

  private async HandleExchangeStartedWithStorageMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateExchangeStartedWithStorageMessage(message);
  }

  private async HandleStorageInventoryContentMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateStorageInventoryContentMessage(message);
  }

  private async HandleStorageKamasUpdateMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateStorageKamasUpdateMessage(message);
  }

  private async HandleStorageObjectUpdateMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateStorageObjectUpdateMessage(message);
  }

  private async HandleStorageObjectRemoveMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateStorageObjectRemoveMessage(message);
  }

  private async HandleStorageObjectsUpdateMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateStorageObjectsUpdateMessage(message);
  }

  private async HandleStorageObjectsRemoveMessage(
    account: Account,
    message: any
  ) {
    account.game.storage.UpdateStorageObjectsRemoveMessage(message);
  }

  private async HandleExchangeLeaveMessage(account: Account, message: any) {
    account.game.storage.UpdateExchangeLeaveMessage(message);
  }
}
