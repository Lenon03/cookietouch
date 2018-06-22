import PrismFightersInformation from "@/protocol/network/types/PrismFightersInformation";
import Message from "@/protocol/network/messages/Message";

export default class PrismFightAddedMessage extends Message {
  public fight: PrismFightersInformation;

  constructor(fight: PrismFightersInformation) {
    super();
    this.fight = fight;

  }
}
