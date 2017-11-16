export default class AchievementObjective {

  public id: number;
  public maxvalue: number;

  constructor(id = 0, maxvalue = 0) {
    this.id = id;
    this.maxvalue = maxvalue;
  }
}
