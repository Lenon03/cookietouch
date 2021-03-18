import Type from "@/protocol/network/types/Type";

export default class BasicGuildInformations extends Type {
  public guildId: number;
  public guildName: string;

  constructor(guildId = 0, guildName = "") {
    super();
    this.guildId = guildId;
    this.guildName = guildName;
  }
}
