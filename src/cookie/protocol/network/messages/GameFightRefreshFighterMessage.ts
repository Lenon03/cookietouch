import GameContextActorInformations from "@protocol/network/types/GameContextActorInformations";
import Message from "./Message";
export default class GameFightRefreshFighterMessage extends Message {
  public informations: GameContextActorInformations;
  constructor(informations: GameContextActorInformations) {
    super();
    this.informations = informations;

  }
}
