import { TeamEnum } from "@/protocol/enums/TeamEnum";
import GameActionFightDeathMessage from "@/protocol/network/messages/GameActionFightDeathMessage";
import GameActionFightLifePointsGainMessage from "@/protocol/network/messages/GameActionFightLifePointsGainMessage";
import GameActionFightLifePointsLostMessage from "@/protocol/network/messages/GameActionFightLifePointsLostMessage";
import GameActionFightPointsVariationMessage from "@/protocol/network/messages/GameActionFightPointsVariationMessage";
import GameActionFightSlideMessage from "@/protocol/network/messages/GameActionFightSlideMessage";
import GameActionFightTeleportOnSameMapMessage from "@/protocol/network/messages/GameActionFightTeleportOnSameMapMessage";
import GameFightTurnEndMessage from "@/protocol/network/messages/GameFightTurnEndMessage";
import GameMapMovementMessage from "@/protocol/network/messages/GameMapMovementMessage";
import CharacterCharacteristicsInformations from "@/protocol/network/types/CharacterCharacteristicsInformations";
import FightTemporaryBoostEffect from "@/protocol/network/types/FightTemporaryBoostEffect";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";
import IdentifiedEntityDispositionInformations from "@/protocol/network/types/IdentifiedEntityDispositionInformations";

export default abstract class FighterEntry {
  public contextualId: number = 0;
  public alive: boolean = false;
  public cellId: number = 0;
  public team: TeamEnum = TeamEnum.TEAM_CHALLENGER;
  public stats: GameFightMinimalStats = new GameFightMinimalStats();
  public lifePoints: number = 0;
  public maxLifePoints: number = 0;
  public actionPoints: number = 0;
  public movementPoints: number = 0;
  public name: string = "";

  constructor(infos: GameFightFighterInformations) {
    this.UpdateGameFightFighterInformations(infos);
  }

  get lifePercent() {
    return (this.lifePoints / this.maxLifePoints) * 100;
  }

  public UpdateGameFightFighterInformations(
    infos: GameFightFighterInformations
  ) {
    this.contextualId = infos.contextualId;
    this.alive = infos.alive;
    this.cellId = infos.disposition.cellId;
    this.team = infos.teamId;
    this.stats = infos.stats;
    this.lifePoints = this.stats.lifePoints;
    this.maxLifePoints = this.stats.maxLifePoints;
    this.actionPoints = this.stats.actionPoints;
    this.movementPoints = this.stats.movementPoints;
  }

  public UpdateIdentifiedEntityDispositionInformations(
    infos: IdentifiedEntityDispositionInformations
  ) {
    this.cellId = infos.cellId;
  }

  public UpdateCharacterCharacteristicsInformations(
    stats: CharacterCharacteristicsInformations
  ) {
    this.lifePoints = stats.lifePoints;
    this.maxLifePoints = stats.maxLifePoints;
    this.actionPoints = stats.actionPointsCurrent;
    this.movementPoints = stats.movementPointsCurrent;
  }

  public UpdateGameActionFightPointsVariationMessage(
    message: GameActionFightPointsVariationMessage
  ) {
    switch (message.actionId) {
      case 101:
      case 102:
      case 120:
        this.actionPoints += message.delta;
        break;
      case 77:
      case 78:
      case 127:
      case 129:
        this.movementPoints += message.delta;
        break;
    }
  }

  public UpdateGameActionFightDeathMessage(
    message: GameActionFightDeathMessage
  ) {
    this.lifePoints = 0;
    this.alive = false;
  }

  public UpdateGameMapMovementMessage(message: GameMapMovementMessage) {
    this.cellId = message.keyMovements[message.keyMovements.length - 1];
  }

  public UpdateGameActionFightTeleportOnSameMapMessage(
    message: GameActionFightTeleportOnSameMapMessage
  ) {
    this.cellId = message.cellId;
  }

  public UpdateGameActionFightSlideMessage(
    message: GameActionFightSlideMessage
  ) {
    this.cellId = message.endCellId;
  }

  public UpdateGameActionFightLifePointsLostMessage(
    message: GameActionFightLifePointsLostMessage
  ) {
    this.lifePoints -= message.loss;
    this.maxLifePoints -= message.permanentDamages;
  }

  public UpdateGameActionFightLifePointsGainMessage(
    message: GameActionFightLifePointsGainMessage
  ) {
    this.lifePoints += message.delta;
    if (this.lifePoints > this.maxLifePoints) {
      this.lifePoints = this.maxLifePoints;
    }
  }

  public UpdateGameFightTurnEndMessage(message: GameFightTurnEndMessage) {
    this.movementPoints = this.stats.movementPoints;
    this.actionPoints = this.stats.actionPoints;
  }

  public Update(actionId: number, ftbe: FightTemporaryBoostEffect) {
    if (actionId === 168) {
      this.actionPoints -= ftbe.delta;
    } else if (actionId === 169) {
      this.movementPoints -= ftbe.delta;
    }
  }
}
