import AchievementObjective from "./AchievementObjective";
import AchievementStartedObjective from "./AchievementStartedObjective";
import Type from "./Type";

export default class Achievement extends Type {

  public finishedObjective: AchievementObjective[];
  public startedObjectives: AchievementStartedObjective[];
  public id: number;

  constructor(id = 0, finishedObjective: AchievementObjective[], startedObjectives: AchievementStartedObjective[]) {
    super();
    this.finishedObjective = finishedObjective;
    this.startedObjectives = startedObjectives;
    this.id = id;
  }
}
