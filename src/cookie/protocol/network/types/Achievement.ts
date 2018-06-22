import AchievementObjective from "@/protocol/network/types/AchievementObjective";
import AchievementStartedObjective from "@/protocol/network/types/AchievementStartedObjective";
import Type from "@/protocol/network/types/Type";

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
