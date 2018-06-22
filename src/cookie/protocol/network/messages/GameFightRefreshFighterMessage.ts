import Message from "@/protocol/network/messages/Message";
import GameContextActorInformations from "@/protocol/network/types/GameContextActorInformations";

export default class GameFightRefreshFighterMessage extends Message {
  public informations: GameContextActorInformations;

  constructor(informations: GameContextActorInformations) {
    super();
    this.informations = informations;

  }
}
