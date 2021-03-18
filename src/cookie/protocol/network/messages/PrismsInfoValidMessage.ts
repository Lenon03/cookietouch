import Message from "@/protocol/network/messages/Message";
import PrismFightersInformation from "@/protocol/network/types/PrismFightersInformation";

export default class PrismsInfoValidMessage extends Message {
  public fights: PrismFightersInformation[];

  constructor(fights: PrismFightersInformation[]) {
    super();
    this.fights = fights;

  }
}
