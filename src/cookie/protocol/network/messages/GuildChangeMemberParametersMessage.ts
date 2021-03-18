import Message from "@/protocol/network/messages/Message";

export default class GuildChangeMemberParametersMessage extends Message {
  public memberId: number;
  public rank: number;
  public experienceGivenPercent: number;
  public rights: number;

  constructor(memberId = 0, rank = 0, experienceGivenPercent = 0, rights = 0) {
    super();
    this.memberId = memberId;
    this.rank = rank;
    this.experienceGivenPercent = experienceGivenPercent;
    this.rights = rights;

  }
}
