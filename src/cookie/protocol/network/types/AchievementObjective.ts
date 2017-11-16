export default class AchievementObjective {

  public id: number;
  public maxValue: number;

  constructor(id = 0, maxValue = 0) {
    this.id = id;
    this.maxValue = maxValue;
  }
}
