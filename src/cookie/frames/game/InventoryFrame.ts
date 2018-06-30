import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import DisplayNumericalValueMessage from "@/protocol/network/messages/DisplayNumericalValueMessage";

export default class InventoryFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "KamasUpdateMessage",
      this.HandleKamasUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "InventoryWeightMessage",
      this.HandleInventoryWeightMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectsQuantityMessage",
      this.HandleObjectsQuantityMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectQuantityMessage",
      this.HandleObjectQuantityMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectMovementMessage",
      this.HandleObjectMovementMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectModifiedMessage",
      this.HandleObjectModifiedMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectsDeletedMessage",
      this.HandleObjectsDeletedMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectDeletedMessage",
      this.HandleObjectDeletedMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectsAddedMessage",
      this.HandleObjectsAddedMessage,
      this
    );
    Frames.dispatcher.register(
      "ObjectAddedMessage",
      this.HandleObjectAddedMessage,
      this
    );
    Frames.dispatcher.register(
      "InventoryContentMessage",
      this.HandleInventoryContentMessage,
      this
    );
    Frames.dispatcher.register(
      "DisplayNumericalValueMessage",
      this.HandleDisplayNumericalValueMessage,
      this
    );
  }

  private async HandleKamasUpdateMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateKamasUpdateMessage(message);
  }

  private async HandleInventoryWeightMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateInventoryWeightMessage(message);
  }

  private async HandleObjectsQuantityMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectsQuantityMessage(message);
  }

  private async HandleObjectQuantityMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectQuantityMessage(message);
  }

  private async HandleObjectMovementMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectMovementMessage(message);
  }

  private async HandleObjectModifiedMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectModifiedMessage(message);
  }

  private async HandleObjectsDeletedMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectsDeletedMessage(message);
  }

  private async HandleObjectDeletedMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectDeletedMessage(message);
  }

  private async HandleObjectsAddedMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectsAddedMessage(message);
  }

  private async HandleObjectAddedMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateObjectAddedMessage(message);
  }

  private async HandleInventoryContentMessage(account: Account, message: any) {
    account.game.character.inventory.UpdateInventoryContentMessage(message);
  }

  private async HandleDisplayNumericalValueMessage(
    account: Account,
    message: DisplayNumericalValueMessage
  ) {
    await account.statistics.UpdateDisplayNumericalValueMessage(message);
  }
}
