import FightTeamInformations from "./FightTeamInformations";
import FightTeamMemberInformations from "./FightTeamMemberInformations";

export default class FightAllianceTeamInformations extends FightTeamInformations {

  public relation: number;

  constructor(teamid = 2, leaderid = 0, teamside = 0, teamtypeid = 0,
              relation = 0, teammembers: FightTeamMemberInformations[]) {
    super(teamid, leaderid, teamside, teamtypeid, teammembers);
    this.relation = relation;
  }
}
