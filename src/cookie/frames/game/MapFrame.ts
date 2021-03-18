import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import Frames, { IFrame } from "@/frames";
import CurrentMapMessage from "@/protocol/network/messages/CurrentMapMessage";
import GameContextRemoveElementMessage from "@/protocol/network/messages/GameContextRemoveElementMessage";
import GameContextRemoveMultipleElementsMessage from "@/protocol/network/messages/GameContextRemoveMultipleElementsMessage";
import GameMapMovementMessage from "@/protocol/network/messages/GameMapMovementMessage";
import GameMapNoMovementMessage from "@/protocol/network/messages/GameMapNoMovementMessage";
import GameRolePlayShowActorMessage from "@/protocol/network/messages/GameRolePlayShowActorMessage";
import GameRolePlayShowChallengeMessage from "@/protocol/network/messages/GameRolePlayShowChallengeMessage";
import InteractiveElementUpdatedMessage from "@/protocol/network/messages/InteractiveElementUpdatedMessage";
import InteractiveMapUpdateMessage from "@/protocol/network/messages/InteractiveMapUpdateMessage";
import MapComplementaryInformationsDataInHouseMessage from "@/protocol/network/messages/MapComplementaryInformationsDataInHouseMessage";
import MapComplementaryInformationsDataMessage from "@/protocol/network/messages/MapComplementaryInformationsDataMessage";
import MapComplementaryInformationsWithCoordsMessage from "@/protocol/network/messages/MapComplementaryInformationsWithCoordsMessage";
import StatedElementUpdatedMessage from "@/protocol/network/messages/StatedElementUpdatedMessage";
import StatedMapUpdateMessage from "@/protocol/network/messages/StatedMapUpdateMessage";
import TeleportOnSameMapMessage from "@/protocol/network/messages/TeleportOnSameMapMessage";

export default class MapFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "CurrentMapMessage",
      this.HandleCurrentMapMessage,
      this
    );
    Frames.dispatcher.register(
      "MapComplementaryInformationsDataMessage",
      this.HandleMapComplementaryInformationsDataMessage,
      this
    );
    Frames.dispatcher.register(
      "MapComplementaryInformationsDataInHouseMessage",
      this.HandleMapComplementaryInformationsDataInHouseMessage,
      this
    );
    Frames.dispatcher.register(
      "MapComplementaryInformationsWithCoordsMessage",
      this.HandleMapComplementaryInformationsWithCoordsMessage,
      this
    );
    Frames.dispatcher.register(
      "StatedMapUpdateMessage",
      this.HandleStatedMapUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "InteractiveMapUpdateMessage",
      this.HandleInteractiveMapUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "StatedElementUpdatedMessage",
      this.HandleStatedElementUpdatedMessage,
      this
    );
    Frames.dispatcher.register(
      "InteractiveElementUpdatedMessage",
      this.HandleInteractiveElementUpdatedMessage,
      this
    );
    Frames.dispatcher.register(
      "GameMapMovementMessage",
      this.HandleGameMapMovementMessage,
      this
    );
    Frames.dispatcher.register(
      "GameMapNoMovementMessage",
      this.HandleGameMapNoMovementMessage,
      this
    );
    Frames.dispatcher.register(
      "GameContextRemoveElementMessage",
      this.HandleGameContextRemoveElementMessage,
      this
    );
    Frames.dispatcher.register(
      "TeleportOnSameMapMessage",
      this.HandleTeleportOnSameMapMessage,
      this
    );
    Frames.dispatcher.register(
      "GameContextRemoveMultipleElementsMessage",
      this.HandleGameContextRemoveMultipleElementsMessage,
      this
    );
    Frames.dispatcher.register(
      "GameRolePlayShowActorMessage",
      this.HandleGameRolePlayShowActorMessage,
      this
    );
    Frames.dispatcher.register(
      "GameRolePlayShowChallengeMessage",
      this.HandleGameRolePlayShowChallengeMessage,
      this
    );
  }

  private async HandleCurrentMapMessage(
    account: Account,
    message: CurrentMapMessage
  ) {
    if (account.state !== AccountStates.RECAPTCHA) {
      account.state = AccountStates.NONE;
    }

    await account.network.sendMessageFree("MapInformationsRequestMessage", {
      mapId: message.mapId
    });
  }

  private async HandleMapComplementaryInformationsDataMessage(
    account: Account,
    message: MapComplementaryInformationsDataMessage
  ) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(
      message
    );
  }

  private async HandleMapComplementaryInformationsDataInHouseMessage(
    account: Account,
    message: MapComplementaryInformationsDataInHouseMessage
  ) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(
      message
    );
  }

  private async HandleMapComplementaryInformationsWithCoordsMessage(
    account: Account,
    message: MapComplementaryInformationsWithCoordsMessage
  ) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(
      message
    );
  }

  private async HandleStatedMapUpdateMessage(
    account: Account,
    message: StatedMapUpdateMessage
  ) {
    await account.game.map.UpdateStatedMapUpdateMessage(message);
  }

  private async HandleInteractiveMapUpdateMessage(
    account: Account,
    message: InteractiveMapUpdateMessage
  ) {
    await account.game.map.UpdateInteractiveMapUpdateMessage(message);
  }

  private async HandleStatedElementUpdatedMessage(
    account: Account,
    message: StatedElementUpdatedMessage
  ) {
    await account.game.map.UpdateStatedElementUpdatedMessage(message);
  }

  private async HandleInteractiveElementUpdatedMessage(
    account: Account,
    message: InteractiveElementUpdatedMessage
  ) {
    await account.game.map.UpdateInteractiveElementUpdatedMessage(message);
  }

  private async HandleGameMapMovementMessage(
    account: Account,
    message: GameMapMovementMessage
  ) {
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

  private async HandleGameMapNoMovementMessage(
    account: Account,
    message: GameMapNoMovementMessage
  ) {
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
    message: GameContextRemoveElementMessage
  ) {
    await account.game.map.UpdateGameContextRemoveElementMessage(message);
  }

  private async HandleTeleportOnSameMapMessage(
    account: Account,
    message: TeleportOnSameMapMessage
  ) {
    const player = account.game.map.players.find(
      p => p.id === message.targetId
    );

    if (player !== undefined) {
      player.UpdateTeleportOnSameMapMessage(message);
    }
  }

  private async HandleGameContextRemoveMultipleElementsMessage(
    account: Account,
    message: GameContextRemoveMultipleElementsMessage
  ) {
    await account.game.map.UpdateGameContextRemoveMultipleElementsMessage(
      message
    );
  }

  private async HandleGameRolePlayShowActorMessage(
    account: Account,
    message: GameRolePlayShowActorMessage
  ) {
    await account.game.map.UpdateGameRolePlayShowActorMessage(message);
  }

  private async HandleGameRolePlayShowChallengeMessage(
    account: Account,
    message: GameRolePlayShowChallengeMessage
  ) {
    await account.game.map.UpdateGameRolePlayShowChallengeMessage(message);
  }
}
