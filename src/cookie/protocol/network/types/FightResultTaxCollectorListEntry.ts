import BasicGuildInformations from "./BasicGuildInformations";
import FightLoot from "./FightLoot";
import FightResultFighterListEntry from "./FightResultFighterListEntry";

export default class FightResultTaxCollectorListEntry extends FightResultFighterListEntry {

  public level: number;
  public guildInfo: BasicGuildInformations;
  public experienceForGuild: number;

  constructor(outcome = 0, rewards: FightLoot, id = 0, alive = false,
              level = 0, guildInfo: BasicGuildInformations, experienceForGuild = 0) {
    super(outcome, rewards, id, alive);
    this.level = level;
    this.guildInfo = guildInfo;
    this.experienceForGuild = experienceForGuild;
  }
}
