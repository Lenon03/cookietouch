import Message from "./Message";

export default class GameFightOptionStateUpdateMessage extends Message {
  public fightId: number;
  public teamId: number;
  public option: number;
  public state: boolean;

  constructor(fightId = 0, teamId = 2, option = 3, state = false) {
    super();
    this.fightId = fightId;
    this.teamId = teamId;
    this.option = option;
    this.state = state;

  }
}
