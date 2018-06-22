import Message from "@/protocol/network/messages/Message";
import AchievementRewardable from "@/protocol/network/types/AchievementRewardable";

export default class AchievementListMessage extends Message {
  public finishedAchievementsIds: number[];
  public rewardableAchievements: AchievementRewardable[];

  constructor(finishedAchievementsIds: number[], rewardableAchievements: AchievementRewardable[]) {
    super();
    this.finishedAchievementsIds = finishedAchievementsIds;
    this.rewardableAchievements = rewardableAchievements;
  }
}
