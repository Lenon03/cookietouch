import AchievementObjective from "./AchievementObjective";
import AchievementStartedObjective from "./AchievementStartedObjective";

export default class Achievement {

  public finishedobjective: AchievementObjective[];
  public startedobjectives: AchievementStartedObjective[];
  public id: number;

  constructor(id = 0, finishedobjective: AchievementObjective[], startedobjectives: AchievementStartedObjective[] ) {
    this.finishedobjective = finishedobjective;
    this.startedobjectives = startedobjectives;
    this.id = id;
  }
}
