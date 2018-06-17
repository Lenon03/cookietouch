import AbstractFightTeamInformations from "./AbstractFightTeamInformations";

export default class FightTeamLightInformations extends AbstractFightTeamInformations {

  public teamMembersCount: number;
  public meanLevel: number;
  public hasFriend: boolean;
  public hasGuildMember: boolean;
  public hasAllianceMember: boolean;
  public hasGroupMember: boolean;
  public hasMytaxCollector: boolean;

  constructor(teamid = 2, leaderid = 0, teamside = 0, teamtypeid = 0,
              teamMembersCount = 0, meanLevel = 0, hasFriend = false,
              hasGuildMember = false, hasAllianceMember = false, hasGroupMember = false,
              hasMytaxCollector = false) {
    super(teamid, leaderid, teamside, teamtypeid);
    this.teamMembersCount = teamMembersCount;
    this.meanLevel = meanLevel;
    this.hasFriend = hasFriend;
    this.hasGuildMember = hasGuildMember;
    this.hasAllianceMember = hasAllianceMember;
    this.hasGroupMember = hasGroupMember;
    this.hasMytaxCollector = hasMytaxCollector;
  }
}
