import FightOptionsInformations from "@/protocol/network/types/FightOptionsInformations";
import FightTeamInformations from "@/protocol/network/types/FightTeamInformations";
import Type from "@/protocol/network/types/Type";

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
