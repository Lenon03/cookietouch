import Message from "@/protocol/network/messages/Message";
import PrismFightersInformation from "@/protocol/network/types/PrismFightersInformation";

export default class PrismFightAddedMessage extends Message {
  public fight: PrismFightersInformation;

  constructor(fight: PrismFightersInformation) {
    super();
    this.fight = fight;

  }
}
