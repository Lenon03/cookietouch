import Message from "./Message";

export default class AchievementRewardSuccessMessage extends Message {
  public achievementId: number;

  constructor(achievementId = 0) {
    super();
    this.achievementId = achievementId;

  }
}
