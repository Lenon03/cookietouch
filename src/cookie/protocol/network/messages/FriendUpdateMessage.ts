import FriendInformations from "@protocol/network/types/FriendInformations";
import Message from "./Message";

export default class FriendUpdateMessage extends Message {
  public friendUpdated: FriendInformations;

  constructor(friendUpdated: FriendInformations) {
    super();
    this.friendUpdated = friendUpdated;

  }
}
