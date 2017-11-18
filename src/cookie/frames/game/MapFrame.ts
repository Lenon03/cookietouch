import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { GatherResults } from "@game/managers/gathers";

export default class MapFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("CurrentMapMessage",
      this.HandleCurrentMapMessage, this);
    this.account.dispatcher.register("MapComplementaryInformationsDataMessage",
      this.HandleMapComplementaryInformationsDataMessage, this);
    this.account.dispatcher.register("MapComplementaryInformationsDataInHouseMessage",
      this.HandleMapComplementaryInformationsDataInHouseMessage, this);
    this.account.dispatcher.register("MapComplementaryInformationsWithCoordsMessage",
      this.HandleMapComplementaryInformationsWithCoordsMessage, this);
    this.account.dispatcher.register("StatedMapUpdateMessage",
      this.HandleStatedMapUpdateMessage, this);
    this.account.dispatcher.register("InteractiveMapUpdateMessage",
      this.HandleInteractiveMapUpdateMessage, this);
    this.account.dispatcher.register("StatedElementUpdatedMessage",
      this.HandleStatedElementUpdatedMessage, this);
    this.account.dispatcher.register("InteractiveElementUpdatedMessage",
      this.HandleInteractiveElementUpdatedMessage, this);
    this.account.dispatcher.register("GameMapMovementMessage",
      this.HandleGameMapMovementMessage, this);
    this.account.dispatcher.register("GameMapNoMovementMessage",
      this.HandleGameMapNoMovementMessage, this);
    this.account.dispatcher.register("GameContextRemoveElementMessage",
      this.HandleGameContextRemoveElementMessage, this);
    this.account.dispatcher.register("TeleportOnSameMapMessage",
      this.HandleTeleportOnSameMapMessage, this);
    this.account.dispatcher.register("GameContextRemoveMultipleElementMessage",
      this.HandleGameContextRemoveMultipleElementMessage, this);
    this.account.dispatcher.register("GameRolePlayShowActorMessage",
      this.HandleGameRolePlayShowActorMessage, this);
  }

  private async HandleCurrentMapMessage(account: Account, message: any) {
    if (account.state !== AccountStates.RECAPTCHA) {
      account.state = AccountStates.NONE;
    }

    await account.network.sendMessage("MapInformationsRequestMessage", {
      mapId: message.mapId,
    });
  }

  private async HandleMapComplementaryInformationsDataMessage(account: Account, message: any) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(account, message);
    // account.game.bid.StartedSelling.on(() => {
    //   account.game.bid.sellItem(287, 10, 1799);
    // });
    // account.game.bid.startSelling();
    account.game.bid.StartedBuying.on(async () => {
      // account.game.bid.buyItem(287, 1);
      const res = await account.game.bid.getItemPrice(287, 10);
      account.logger.logDofus("", `${res} KAMAS`);
    });
    account.game.bid.startBuying();
    // account.game.managers.gathers.GatherStarted.on(() => console.log("GATHER STARTED"));
    // account.game.managers.gathers.GatherFinished.on((result) => console.log("GATHER FINISHED: " + GatherResults[result]));
    // const res = account.game.managers.gathers.gather(1);
    // console.log("CanGather", res);
    // console.log("ACCOUNT", account);
  }

  private async HandleMapComplementaryInformationsDataInHouseMessage(account: Account, message: any) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(account, message);
  }

  private async HandleMapComplementaryInformationsWithCoordsMessage(account: Account, message: any) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(account, message);
  }

  private async HandleStatedMapUpdateMessage(account: Account, message: any) {
    await account.game.map.UpdateStatedMapUpdateMessage(account, message);
  }

  private async HandleInteractiveMapUpdateMessage(account: Account, message: any) {
    await account.game.map.UpdateInteractiveMapUpdateMessage(account, message);
  }

  private async HandleStatedElementUpdatedMessage(account: Account, message: any) {
    await account.game.map.UpdateStatedElementUpdatedMessage(account, message);
  }

  private async HandleInteractiveElementUpdatedMessage(account: Account, message: any) {
    await account.game.map.UpdateInteractiveElementUpdatedMessage(account, message);
  }

  private async HandleGameMapMovementMessage(account: Account, message: any) {
    if (account.state === AccountStates.FIGHTING) {
      return;
    }

    await account.game.map.UpdateGameMapMovementMessage(account, message);
    await account.game.managers.movements.UpdateGameMapMovementMessage(account, message);
  }

  private async HandleGameMapNoMovementMessage(account: Account, message: any) {
    if (account.state === AccountStates.FIGHTING || account.state === AccountStates.RECAPTCHA) {
      return;
    }

    account.state = AccountStates.NONE;
    await account.game.managers.movements.UpdateGameMapNoMovementMessage(account, message);
  }

  private async HandleGameContextRemoveElementMessage(account: Account, message: any) {
    await account.game.map.UpdateGameContextRemoveElementMessage(account, message);
  }

  private async HandleTeleportOnSameMapMessage(account: Account, message: any) {
    const player = account.game.map.players.find((p: any) => p.id === message.targetId);

    if (player !== undefined) {
      player.UpdateTeleportOnSameMapMessage(message);
    }
  }

  private async HandleGameContextRemoveMultipleElementMessage(account: Account, message: any) {
    await account.game.map.UpdateGameContextRemoveMultipleElementMessage(account, message);
  }

  private async HandleGameRolePlayShowActorMessage(account: Account, message: any) {
    await account.game.map.UpdateGameRolePlayShowActorMessage(account, message);
  }
}
