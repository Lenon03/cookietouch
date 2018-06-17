import GuildMember from "@protocol/network/types/GuildMember";
import Message from "./Message";

export default class GuildInformationsMemberUpdateMessage extends Message {
  public member: GuildMember;

  constructor(member: GuildMember) {
    super();
    this.member = member;

  }
}
