import AbstractFightTeamInformations from "@/protocol/network/types/AbstractFightTeamInformations";
import FightTeamMemberInformations from "@/protocol/network/types/FightTeamMemberInformations";

export default class FightTeamInformations extends AbstractFightTeamInformations {

  public teamMembers: FightTeamMemberInformations[];

  constructor(teamid = 2, leaderid = 0, teamside = 0, teamtypeid = 0, teamMembers: FightTeamMemberInformations[]) {
    super(teamid, leaderid, teamside, teamtypeid);
    this.teamMembers = teamMembers;
  }
}
