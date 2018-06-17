import FriendSpouseInformations from "@protocol/network/types/FriendSpouseInformations";
import Message from "./Message";

export default class SpouseInformationsMessage extends Message {
  public spouse: FriendSpouseInformations;

  constructor(spouse: FriendSpouseInformations) {
    super();
    this.spouse = spouse;

  }
}
