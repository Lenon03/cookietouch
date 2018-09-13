import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeStartedWithStorageMessage from "@/protocol/network/messages/ExchangeStartedWithStorageMessage";
import StorageInventoryContentMessage from "@/protocol/network/messages/StorageInventoryContentMessage";
import StorageKamasUpdateMessage from "@/protocol/network/messages/StorageKamasUpdateMessage";
import StorageObjectRemoveMessage from "@/protocol/network/messages/StorageObjectRemoveMessage";
import StorageObjectsRemoveMessage from "@/protocol/network/messages/StorageObjectsRemoveMessage";
import StorageObjectsUpdateMessage from "@/protocol/network/messages/StorageObjectsUpdateMessage";
import StorageObjectUpdateMessage from "@/protocol/network/messages/StorageObjectUpdateMessage";

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
    message: ExchangeStartedWithStorageMessage
  ) {
    account.game.storage.UpdateExchangeStartedWithStorageMessage(message);
  }

  private async HandleStorageInventoryContentMessage(
    account: Account,
    message: StorageInventoryContentMessage
  ) {
    account.game.storage.UpdateStorageInventoryContentMessage(message);
  }

  private async HandleStorageKamasUpdateMessage(
    account: Account,
    message: StorageKamasUpdateMessage
  ) {
    account.game.storage.UpdateStorageKamasUpdateMessage(message);
  }

  private async HandleStorageObjectUpdateMessage(
    account: Account,
    message: StorageObjectUpdateMessage
  ) {
    account.game.storage.UpdateStorageObjectUpdateMessage(message);
  }

  private async HandleStorageObjectRemoveMessage(
    account: Account,
    message: StorageObjectRemoveMessage
  ) {
    account.game.storage.UpdateStorageObjectRemoveMessage(message);
  }

  private async HandleStorageObjectsUpdateMessage(
    account: Account,
    message: StorageObjectsUpdateMessage
  ) {
    account.game.storage.UpdateStorageObjectsUpdateMessage(message);
  }

  private async HandleStorageObjectsRemoveMessage(
    account: Account,
    message: StorageObjectsRemoveMessage
  ) {
    account.game.storage.UpdateStorageObjectsRemoveMessage(message);
  }

  private async HandleExchangeLeaveMessage(
    account: Account,
    message: ExchangeLeaveMessage
  ) {
    account.game.storage.UpdateExchangeLeaveMessage(message);
  }
}
