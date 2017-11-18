import GameFightFighterInformations from "@protocol/network/types/GameFightFighterInformations";
import Message from "./Message";
export default class GameFightShowFighterMessage extends Message {
  public informations: GameFightFighterInformations;
  constructor(informations: GameFightFighterInformations) {
    super();
    this.informations = informations;

  }
}
