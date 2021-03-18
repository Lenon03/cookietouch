import Message from "@/protocol/network/messages/Message";
import FriendSpouseInformations from "@/protocol/network/types/FriendSpouseInformations";

export default class SpouseInformationsMessage extends Message {
  public spouse: FriendSpouseInformations;

  constructor(spouse: FriendSpouseInformations) {
    super();
    this.spouse = spouse;

  }
}
