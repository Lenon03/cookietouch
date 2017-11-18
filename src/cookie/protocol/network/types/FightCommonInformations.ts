import FightOptionsInformations from "./FightOptionsInformations";
import FightTeamInformations from "./FightTeamInformations";

export default class FightCommonInformations {

  public fightteams: FightTeamInformations[];
  public fightteamspositions: number;
  public fightteamsoptions: FightOptionsInformations[];
  public fightid: number;
  public fighttype: number;

  constructor(fightid = 0, fighttype = 0, fightteams: FightTeamInformations[],
              fightteamspositions = 0, fightteamsoptions: FightOptionsInformations[]) {
    this.fightid = fightid;
    this.fightteams = fightteams;
    this.fightteamspositions = fightteamspositions;
    this.fightteamsoptions = fightteamsoptions;
    this.fighttype = fighttype;
  }
}
