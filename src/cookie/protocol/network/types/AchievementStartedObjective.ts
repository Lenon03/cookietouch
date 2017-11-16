import AchievementObjective from "./AchievementObjective";

export default class AchievementStartedObjective extends AchievementObjective {

  public value: number;
  constructor(id = 0, maxValue = 0, value = 0 ) {
    super(id, maxValue);
    this.value = value;
  }
}
