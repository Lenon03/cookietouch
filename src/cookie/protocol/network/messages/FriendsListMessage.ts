import FriendInformations from "@/protocol/network/types/FriendInformations";
import Message from "@/protocol/network/messages/Message";

export default class FriendsListMessage extends Message {
  public friendsList: FriendInformations[];

  constructor(friendsList: FriendInformations[]) {
    super();
    this.friendsList = friendsList;

  }
}
