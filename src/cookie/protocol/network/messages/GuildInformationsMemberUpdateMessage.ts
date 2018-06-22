import Message from "@/protocol/network/messages/Message";
import GuildMember from "@/protocol/network/types/GuildMember";

export default class GuildInformationsMemberUpdateMessage extends Message {
  public member: GuildMember;

  constructor(member: GuildMember) {
    super();
    this.member = member;

  }
}
