import Message from "./Message";

export default class ChallengeInfoMessage extends Message {
  public challengeId: number;
  public targetId: number;
  public xpBonus: number;
  public dropBonus: number;

  constructor(challengeId = 0, targetId = 0, xpBonus = 0, dropBonus = 0) {
    super();
    this.challengeId = challengeId;
    this.targetId = targetId;
    this.xpBonus = xpBonus;
    this.dropBonus = dropBonus;

  }
}
