import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";

export default class MapFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "CurrentMapMessage",
      this.HandleCurrentMapMessage,
      this
    );
    this.account.dispatcher.register(
      "MapComplementaryInformationsDataMessage",
      this.HandleMapComplementaryInformationsDataMessage,
      this
    );
    this.account.dispatcher.register(
      "MapComplementaryInformationsDataInHouseMessage",
      this.HandleMapComplementaryInformationsDataInHouseMessage,
      this
    );
    this.account.dispatcher.register(
      "MapComplementaryInformationsWithCoordsMessage",
      this.HandleMapComplementaryInformationsWithCoordsMessage,
      this
    );
    this.account.dispatcher.register(
      "StatedMapUpdateMessage",
      this.HandleStatedMapUpdateMessage,
      this
    );
    this.account.dispatcher.register(
      "InteractiveMapUpdateMessage",
      this.HandleInteractiveMapUpdateMessage,
      this
    );
    this.account.dispatcher.register(
      "StatedElementUpdatedMessage",
      this.HandleStatedElementUpdatedMessage,
      this
    );
    this.account.dispatcher.register(
      "InteractiveElementUpdatedMessage",
      this.HandleInteractiveElementUpdatedMessage,
      this
    );
    this.account.dispatcher.register(
      "GameMapMovementMessage",
      this.HandleGameMapMovementMessage,
      this
    );
    this.account.dispatcher.register(
      "GameMapNoMovementMessage",
      this.HandleGameMapNoMovementMessage,
      this
    );
    this.account.dispatcher.register(
      "GameContextRemoveElementMessage",
      this.HandleGameContextRemoveElementMessage,
      this
    );
    this.account.dispatcher.register(
      "TeleportOnSameMapMessage",
      this.HandleTeleportOnSameMapMessage,
      this
    );
    this.account.dispatcher.register(
      "GameContextRemoveMultipleElementMessage",
      this.HandleGameContextRemoveMultipleElementMessage,
      this
    );
    this.account.dispatcher.register(
      "GameRolePlayShowActorMessage",
      this.HandleGameRolePlayShowActorMessage,
      this
    );
  }

  private async HandleCurrentMapMessage(account: Account, message: any) {
    if (account.state !== AccountStates.RECAPTCHA) {
      account.state = AccountStates.NONE;
    }

    await account.network.sendMessageFree("MapInformationsRequestMessage", {
      mapId: message.mapId
    });
  }

  private async HandleMapComplementaryInformationsDataMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(
      message
    );
  }

  private async HandleMapComplementaryInformationsDataInHouseMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(
      message
    );
  }

  private async HandleMapComplementaryInformationsWithCoordsMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(
      message
    );
  }

  private async HandleStatedMapUpdateMessage(account: Account, message: any) {
    await account.game.map.UpdateStatedMapUpdateMessage(message);
  }

  private async HandleInteractiveMapUpdateMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateInteractiveMapUpdateMessage(message);
  }

  private async HandleStatedElementUpdatedMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateStatedElementUpdatedMessage(message);
  }

  private async HandleInteractiveElementUpdatedMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateInteractiveElementUpdatedMessage(message);
  }

  private async HandleGameMapMovementMessage(account: Account, message: any) {
    if (account.state === AccountStates.FIGHTING) {
      return;
    }

    account.game.map.UpdateGameMapMovementMessage(message);
    account.game.managers.movements.UpdateGameMapMovementMessage(
      account,
      message
    );
    account.extensions.characterCreation.UpdateGameMapMovementMessage(message);
  }

  private async HandleGameMapNoMovementMessage(account: Account, message: any) {
    if (
      account.state === AccountStates.FIGHTING ||
      account.state === AccountStates.RECAPTCHA
    ) {
      return;
    }

    account.state = AccountStates.NONE;
    await account.game.managers.movements.UpdateGameMapNoMovementMessage(
      account,
      message
    );
  }

  private async HandleGameContextRemoveElementMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateGameContextRemoveElementMessage(message);
  }

  private async HandleTeleportOnSameMapMessage(account: Account, message: any) {
    const player = account.game.map.players.find(
      (p: any) => p.id === message.targetId
    );

    if (player !== undefined) {
      player.UpdateTeleportOnSameMapMessage(message);
    }
  }

  private async HandleGameContextRemoveMultipleElementMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateGameContextRemoveMultipleElementMessage(
      message
    );
  }

  private async HandleGameRolePlayShowActorMessage(
    account: Account,
    message: any
  ) {
    await account.game.map.UpdateGameRolePlayShowActorMessage(message);
  }
}
