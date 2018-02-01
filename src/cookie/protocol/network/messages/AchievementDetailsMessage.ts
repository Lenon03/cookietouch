import Achievement from "@protocol/network/types/Achievement";

import Message from "./Message";

export default class AchievementDetailsMessage extends Message {
  public achievement: Achievement;

  constructor(achievement: Achievement) {
    super();
    this.achievement = achievement;
  }
}
