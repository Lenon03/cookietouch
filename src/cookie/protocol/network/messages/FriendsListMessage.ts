import Message from "@/protocol/network/messages/Message";
import FriendInformations from "@/protocol/network/types/FriendInformations";

export default class FriendsListMessage extends Message {
  public friendsList: FriendInformations[];

  constructor(friendsList: FriendInformations[]) {
    super();
    this.friendsList = friendsList;

  }
}
