import Message from "@/protocol/network/messages/Message";
import GuildMember from "@/protocol/network/types/GuildMember";

export default class GuildInformationsMembersMessage extends Message {
  public members: GuildMember[];

  constructor(members: GuildMember[]) {
    super();
    this.members = members;

  }
}
