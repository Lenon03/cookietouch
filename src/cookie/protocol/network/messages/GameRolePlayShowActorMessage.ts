import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameRolePlayShowActorMessage extends Message {
  public informations: GameRolePlayActorInformations;

  constructor(informations: GameRolePlayActorInformations) {
    super();
    this.informations = informations;

  }
}
