export default class AbstractFightTeamInformations {
  public teamId: number;
  public leaderId: number;
  public teamSide: number;
  public teamTypeId: number;

  constructor(teamId = 2, leaderId = 0, teamSide = 0, teamTypeId = 0) {
    teamId = teamId;
    leaderId = leaderId;
    teamSide = teamSide;
    teamTypeId = teamTypeId;
  }
}
