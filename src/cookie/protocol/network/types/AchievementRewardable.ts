export default class AchievementRewardable {

  public id: number;
  public finishedlevel: number;

  constructor(id = 0, finishedlevel = 0) {
    this.id = id;
    this.finishedlevel = finishedlevel;
  }
}
