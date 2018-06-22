import FightExternalInformations from "@/protocol/network/types/FightExternalInformations";
import Message from "@/protocol/network/messages/Message";

export default class MapRunningFightListMessage extends Message {
  public fights: FightExternalInformations[];

  constructor(fights: FightExternalInformations[]) {
    super();
    this.fights = fights;

  }
}
