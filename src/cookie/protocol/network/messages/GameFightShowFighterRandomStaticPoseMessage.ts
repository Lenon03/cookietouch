import GameFightShowFighterMessage from "@/protocol/network/messages/GameFightShowFighterMessage";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";

export default class GameFightShowFighterRandomStaticPoseMessage extends GameFightShowFighterMessage {
  constructor(informations: GameFightFighterInformations) {
    super(informations);

  }
}
