import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { GatherResults } from "@game/managers/gathers";
import { sleep } from "@utils/Time";

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
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(message);
    await sleep(1000);
    // Sorts
    const divine = new Spell(145, "??", SpellTargets.SELF, 1, 2, 100, 100, SpellResistances.WIND, 100, 0, false, true, false, false);
    const pression = new Spell(141, "??", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    const vita = new Spell(155, "??", SpellTargets.SELF, 3, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);
    const puissance = new Spell(153, "??", SpellTargets.SELF, 1, 1, 100, 100, SpellResistances.EARTH, 100, 0, false, false, false, false);

    account.extensions.fights.config.spells.push(divine);
    account.extensions.fights.config.spells.push(pression);
    account.extensions.fights.config.spells.push(vita);
    account.extensions.fights.config.spells.push(puissance);
    // config
    account.extensions.fights.config.startPlacement = FightStartPlacement.CLOSE_TO_ENEMIES;
    account.extensions.fights.config.monsterToApproach = -1;
    account.extensions.fights.config.spellToApproach = -1;
    account.extensions.fights.config.blockSpectatorScenario = BlockSpectatorScenarios.NEVER;
    account.extensions.fights.config.lockFight = false;
    account.extensions.fights.config.tactic = FightTactics.AGGRESSIVE;
    account.extensions.fights.config.maxCells = 4;
    account.extensions.fights.config.approachWhenNoSpellCasted = true;
    account.extensions.fights.config.baseApproachAllMonsters = true;
    account.extensions.fights.config.regenStart = 60;
    account.extensions.fights.config.regenEnd = 80;
    //
    const group = this.account.game.map.getMonstersGroup()[0];
    if (group !== undefined) {
      account.game.managers.movements.moveToCell(group.cellId);
    }
  }

  private async HandleMapComplementaryInformationsDataInHouseMessage(account: Account, message: any) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(message);
  }

  private async HandleMapComplementaryInformationsWithCoordsMessage(account: Account, message: any) {
    await account.game.map.UpdateMapComplementaryInformationsDataMessage(message);
  }

  private async HandleStatedMapUpdateMessage(account: Account, message: any) {
    await account.game.map.UpdateStatedMapUpdateMessage(message);
  }

  private async HandleInteractiveMapUpdateMessage(account: Account, message: any) {
    await account.game.map.UpdateInteractiveMapUpdateMessage(message);
  }

  private async HandleStatedElementUpdatedMessage(account: Account, message: any) {
    await account.game.map.UpdateStatedElementUpdatedMessage(message);
  }

  private async HandleInteractiveElementUpdatedMessage(account: Account, message: any) {
    await account.game.map.UpdateInteractiveElementUpdatedMessage(message);
  }

  private async HandleGameMapMovementMessage(account: Account, message: any) {
    if (account.state === AccountStates.FIGHTING) {
      return;
    }

    await account.game.map.UpdateGameMapMovementMessage(message);
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
    await account.game.map.UpdateGameContextRemoveElementMessage(message);
  }

  private async HandleTeleportOnSameMapMessage(account: Account, message: any) {
    const player = account.game.map.players.find((p: any) => p.id === message.targetId);

    if (player !== undefined) {
      player.UpdateTeleportOnSameMapMessage(message);
    }
  }

  private async HandleGameContextRemoveMultipleElementMessage(account: Account, message: any) {
    await account.game.map.UpdateGameContextRemoveMultipleElementMessage(message);
  }

  private async HandleGameRolePlayShowActorMessage(account: Account, message: any) {
    await account.game.map.UpdateGameRolePlayShowActorMessage(message);
  }
}
