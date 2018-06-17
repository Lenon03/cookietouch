import Message from "./Message";

export default class AchievementRewardRequestMessage extends Message {
  public achievementId: number;

  constructor(achievementId = 0) {
    super();
    this.achievementId = achievementId;

  }
}
