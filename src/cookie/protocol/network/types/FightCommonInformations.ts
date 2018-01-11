import FightOptionsInformations from "./FightOptionsInformations";
import FightTeamInformations from "./FightTeamInformations";
import Type from "./Type";

export default class FightCommonInformations extends Type {

  public fightteams: FightTeamInformations[];
  public fightteamspositions: number;
  public fightteamsoptions: FightOptionsInformations[];
  public fightid: number;
  public fighttype: number;

  constructor(fightid = 0, fighttype = 0, fightteams: FightTeamInformations[],
              fightteamspositions = 0, fightteamsoptions: FightOptionsInformations[]) {
    super();
    this.fightid = fightid;
    this.fightteams = fightteams;
    this.fightteamspositions = fightteamspositions;
    this.fightteamsoptions = fightteamsoptions;
    this.fighttype = fighttype;
  }
}
