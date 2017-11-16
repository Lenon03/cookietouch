import AchievementObjective from "./AchievementObjective";
import AchievementStartedObjective from "./AchievementStartedObjective";

export default class Achievement {

  public finishedObjective: AchievementObjective[];
  public startedObjectives: AchievementStartedObjective[];
  public id: number;

  constructor(id = 0, finishedObjective: AchievementObjective[], startedObjectives: AchievementStartedObjective[] ) {
    this.finishedObjective = finishedObjective;
    this.startedObjectives = startedObjectives;
    this.id = id;
  }
}
