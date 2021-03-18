import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import DisplayNumericalValueMessage from "@/protocol/network/messages/DisplayNumericalValueMessage";
import InventoryContentMessage from "@/protocol/network/messages/InventoryContentMessage";
import InventoryWeightMessage from "@/protocol/network/messages/InventoryWeightMessage";
import KamasUpdateMessage from "@/protocol/network/messages/KamasUpdateMessage";
import ObjectAddedMessage from "@/protocol/network/messages/ObjectAddedMessage";
import ObjectDeletedMessage from "@/protocol/network/messages/ObjectDeletedMessage";
import ObjectModifiedMessage from "@/protocol/network/messages/ObjectModifiedMessage";
import ObjectMovementMessage from "@/protocol/network/messages/ObjectMovementMessage";
import ObjectQuantityMessage from "@/protocol/network/messages/ObjectQuantityMessage";
import ObjectsAddedMessage from "@/protocol/network/messages/ObjectsAddedMessage";
import ObjectsDeletedMessage from "@/protocol/network/messages/ObjectsDeletedMessage";
import ObjectsQuantityMessage from "@/protocol/network/messages/ObjectsQuantityMessage";

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

  private async HandleKamasUpdateMessage(
    account: Account,
    message: KamasUpdateMessage
  ) {
    account.game.character.inventory.UpdateKamasUpdateMessage(message);
  }

  private async HandleInventoryWeightMessage(
    account: Account,
    message: InventoryWeightMessage
  ) {
    account.game.character.inventory.UpdateInventoryWeightMessage(message);
  }

  private async HandleObjectsQuantityMessage(
    account: Account,
    message: ObjectsQuantityMessage
  ) {
    account.game.character.inventory.UpdateObjectsQuantityMessage(message);
  }

  private async HandleObjectQuantityMessage(
    account: Account,
    message: ObjectQuantityMessage
  ) {
    account.game.character.inventory.UpdateObjectQuantityMessage(message);
  }

  private async HandleObjectMovementMessage(
    account: Account,
    message: ObjectMovementMessage
  ) {
    account.game.character.inventory.UpdateObjectMovementMessage(message);
  }

  private async HandleObjectModifiedMessage(
    account: Account,
    message: ObjectModifiedMessage
  ) {
    account.game.character.inventory.UpdateObjectModifiedMessage(message);
  }

  private async HandleObjectsDeletedMessage(
    account: Account,
    message: ObjectsDeletedMessage
  ) {
    account.game.character.inventory.UpdateObjectsDeletedMessage(message);
  }

  private async HandleObjectDeletedMessage(
    account: Account,
    message: ObjectDeletedMessage
  ) {
    account.game.character.inventory.UpdateObjectDeletedMessage(message);
  }

  private async HandleObjectsAddedMessage(
    account: Account,
    message: ObjectsAddedMessage
  ) {
    account.game.character.inventory.UpdateObjectsAddedMessage(message);
  }

  private async HandleObjectAddedMessage(
    account: Account,
    message: ObjectAddedMessage
  ) {
    account.game.character.inventory.UpdateObjectAddedMessage(message);
  }

  private async HandleInventoryContentMessage(
    account: Account,
    message: InventoryContentMessage
  ) {
    account.game.character.inventory.UpdateInventoryContentMessage(message);
  }

  private async HandleDisplayNumericalValueMessage(
    account: Account,
    message: DisplayNumericalValueMessage
  ) {
    account.statistics.UpdateDisplayNumericalValueMessage(message);
  }
}
