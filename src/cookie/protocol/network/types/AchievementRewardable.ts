export default class AchievementRewardable {

  public id: number;
  public finishedLevel: number;

  constructor(id = 0, finishedLevel = 0) {
    this.id = id;
    this.finishedLevel = finishedLevel;
  }
}
