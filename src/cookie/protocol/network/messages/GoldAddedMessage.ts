import Message from "@/protocol/network/messages/Message";
import GoldItem from "@/protocol/network/types/GoldItem";

export default class GoldAddedMessage extends Message {
  public gold: GoldItem;

  constructor(gold: GoldItem) {
    super();
    this.gold = gold;

  }
}
