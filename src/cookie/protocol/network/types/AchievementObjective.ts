import Type from "@/protocol/network/types/Type";

export default class AchievementObjective extends Type {

  public id: number;
  public maxValue: number;

  constructor(id = 0, maxValue = 0) {
    super();
    this.id = id;
    this.maxValue = maxValue;
  }
}
