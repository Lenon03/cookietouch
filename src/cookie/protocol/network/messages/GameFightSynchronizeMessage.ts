import Message from "@/protocol/network/messages/Message";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";

export default class GameFightSynchronizeMessage extends Message {
  public fighters: GameFightFighterInformations[];

  constructor(fighters: GameFightFighterInformations[]) {
    super();
    this.fighters = fighters;

  }
}
