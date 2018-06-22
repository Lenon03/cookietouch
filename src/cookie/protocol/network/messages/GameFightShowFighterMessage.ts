import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameFightShowFighterMessage extends Message {
  public informations: GameFightFighterInformations;

  constructor(informations: GameFightFighterInformations) {
    super();
    this.informations = informations;

  }
}
