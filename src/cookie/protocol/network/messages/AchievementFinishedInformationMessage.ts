import AchievementFinishedMessage from "@/protocol/network/messages/AchievementFinishedMessage";

export default class AchievementFinishedInformationMessage extends AchievementFinishedMessage {
  public name: string;
  public playerId: number;

  constructor(id = 0, finishedlevel = 0, name = "", playerId = 0) {
    super();
    this.name = name;
    this.playerId = playerId;
  }
}
