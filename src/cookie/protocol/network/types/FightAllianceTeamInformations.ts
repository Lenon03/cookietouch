import FightTeamInformations from "@/protocol/network/types/FightTeamInformations";
import FightTeamMemberInformations from "@/protocol/network/types/FightTeamMemberInformations";

export default class FightAllianceTeamInformations extends FightTeamInformations {

  public relation: number;

  constructor(teamid = 2, leaderid = 0, teamside = 0, teamtypeid = 0,
              relation = 0, teammembers: FightTeamMemberInformations[]) {
    super(teamid, leaderid, teamside, teamtypeid, teammembers);
    this.relation = relation;
  }
}
