import Type from "./Type";

export default class AbstractFightTeamInformations extends Type {
  public teamId: number;
  public leaderId: number;
  public teamSide: number;
  public teamTypeId: number;

  constructor(teamId = 2, leaderId = 0, teamSide = 0, teamTypeId = 0) {
    super();
    this.teamId = teamId;
    this.leaderId = leaderId;
    this.teamSide = teamSide;
    this.teamTypeId = teamTypeId;
  }
}
