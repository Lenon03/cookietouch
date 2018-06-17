import Message from "./Message";

export default class GameRolePlayArenaRegistrationStatusMessage extends Message {
  public registered: boolean;
  public step: number;
  public battleMode: number;

  constructor(registered = false, step = 0, battleMode = 3) {
    super();
    this.registered = registered;
    this.step = step;
    this.battleMode = battleMode;

  }
}
