import Type from "./Type";
export default class AchievementRewardable extends Type {

  public id: number;
  public finishedLevel: number;

  constructor(id = 0, finishedLevel = 0) {
    super();
    this.id = id;
    this.finishedLevel = finishedLevel;
  }
}
