import GameRolePlayActorInformations from "@protocol/network/types/GameRolePlayActorInformations";
import GameRolePlayShowActorMessage from "./GameRolePlayShowActorMessage";

export default class GameRolePlayShowActorWithEventMessage extends GameRolePlayShowActorMessage {
  public actorEventId: number;

  constructor(informations: GameRolePlayActorInformations, actorEventId = 0) {
    super(informations);
    this.actorEventId = actorEventId;

  }
}
