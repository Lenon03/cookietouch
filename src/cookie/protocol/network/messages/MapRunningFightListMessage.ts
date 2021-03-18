import Message from "@/protocol/network/messages/Message";
import FightExternalInformations from "@/protocol/network/types/FightExternalInformations";

export default class MapRunningFightListMessage extends Message {
  public fights: FightExternalInformations[];

  constructor(fights: FightExternalInformations[]) {
    super();
    this.fights = fights;

  }
}
