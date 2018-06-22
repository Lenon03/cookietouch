import GuildEmblem from "@/protocol/network/types/GuildEmblem";
import GuildFactSheetInformations from "@/protocol/network/types/GuildFactSheetInformations";

export default class GuildInsiderFactSheetInformations extends GuildFactSheetInformations {
  public leaderName: string;
  public nbConnectedMembers: number;
  public nbTaxCollectors: number;
  public lastActivity: number;
  public enabled: boolean;

  constructor(guildId = 0, guildName = "", guildEmblem: GuildEmblem = null,
              leaderId = 0, guildLevel = 0, nbMembers = 0, leaderName = "",
              nbConnectedMembers = 0, nbTaxCollectors = 0, lastActivity = 0,
              enabled = false) {
    super(guildId, guildName, guildEmblem, leaderId, guildLevel, nbMembers);
    this.leaderName = leaderName;
    this.nbConnectedMembers = nbConnectedMembers;
    this.nbTaxCollectors = nbTaxCollectors;
    this.lastActivity = lastActivity;
    this.enabled = enabled;
  }
}
