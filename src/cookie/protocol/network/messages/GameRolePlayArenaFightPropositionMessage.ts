import Message from "./Message";

export default class GameRolePlayArenaFightPropositionMessage extends Message {
  public alliesId: number[];
  public fightId: number;
  public duration: number;

  constructor(fightId = 0, duration = 0, alliesId: number[]) {
    super();
    this.alliesId = alliesId;
    this.fightId = fightId;
    this.duration = duration;

  }
}
