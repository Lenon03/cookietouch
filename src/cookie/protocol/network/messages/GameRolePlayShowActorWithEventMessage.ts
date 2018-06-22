import GameRolePlayShowActorMessage from "@/protocol/network/messages/GameRolePlayShowActorMessage";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";

export default class GameRolePlayShowActorWithEventMessage extends GameRolePlayShowActorMessage {
  public actorEventId: number;

  constructor(informations: GameRolePlayActorInformations, actorEventId = 0) {
    super(informations);
    this.actorEventId = actorEventId;

  }
}
