import Message from "@/protocol/network/messages/Message";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";

export default class GameFightShowFighterMessage extends Message {
  public informations: GameFightFighterInformations;

  constructor(informations: GameFightFighterInformations) {
    super();
    this.informations = informations;

  }
}
