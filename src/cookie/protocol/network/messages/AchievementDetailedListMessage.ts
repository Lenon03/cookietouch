import Message from "@/protocol/network/messages/Message";
import Achievement from "@/protocol/network/types/Achievement";

export default class AchievementDetailedListMessage extends Message {
  public startedAchievements: Achievement[];
  public finishedAchievements: Achievement[];

  constructor(startedAchievements: Achievement[], finishedAchievements: Achievement[]) {
    super();
    this.startedAchievements = startedAchievements;
    this.finishedAchievements = finishedAchievements;
  }
}
