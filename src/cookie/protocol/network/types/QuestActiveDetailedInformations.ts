import QuestActiveInformations from "./QuestActiveInformations";
import QuestObjectiveInformations from "./QuestObjectiveInformations";
export default class QuestActiveDetailedInformations extends QuestActiveInformations {
  public objectives: QuestObjectiveInformations[];
  public stepId: number;
  constructor(questId = 0, stepId = 0, objectives: QuestObjectiveInformations[] = null) {
    super(questId);
    this.objectives = objectives;
    this.stepId = stepId;

  }
}
