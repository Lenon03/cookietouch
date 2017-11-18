import Message from "./Message";
export default class GameFightRemoveTeamMemberMessage extends Message {
  public fightId: number;
  public teamId: number;
  public charId: number;
  constructor(fightId = 0, teamId = 2, charId = 0) {
    super();
    this.fightId = fightId;
    this.teamId = teamId;
    this.charId = charId;

  }
}
