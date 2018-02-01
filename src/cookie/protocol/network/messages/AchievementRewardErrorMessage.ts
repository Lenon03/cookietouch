import Message from "./Message";

export default class AchievementRewardErrorMessage extends Message {
  public achievementId: number;

  constructor(achievementId = 0) {
    super();
    this.achievementId = achievementId;

  }
}
