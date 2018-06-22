import Account from "@/account";
import DisplayNumericalValueMessage from "@/protocol/network/messages/DisplayNumericalValueMessage";

export default class InventoryFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "KamasUpdateMessage",
      this.HandleKamasUpdateMessage,
      this
    );
    this.account.dispatcher.register(
      "InventoryWeightMessage",
      this.HandleInventoryWeightMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectsQuantityMessage",
      this.HandleObjectsQuantityMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectQuantityMessage",
      this.HandleObjectQuantityMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectMovementMessage",
      this.HandleObjectMovementMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectModifiedMessage",
      this.HandleObjectModifiedMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectsDeletedMessage",
      this.HandleObjectsDeletedMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectDeletedMessage",
      this.HandleObjectDeletedMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectsAddedMessage",
      this.HandleObjectsAddedMessage,
      this
    );
    this.account.dispatcher.register(
      "ObjectAddedMessage",
      this.HandleObjectAddedMessage,
      this
    );
    this.account.dispatcher.register(
      "InventoryContentMessage",
      this.HandleInventoryContentMessage,
      this
    );
    this.account.dispatcher.register(
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
