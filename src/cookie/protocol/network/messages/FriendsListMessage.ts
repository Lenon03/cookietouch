import FriendInformations from "@protocol/network/types/FriendInformations";
import Message from "./Message";

export default class FriendsListMessage extends Message {
  public friendsList: FriendInformations[];

  constructor(friendsList: FriendInformations[]) {
    super();
    this.friendsList = friendsList;

  }
}
