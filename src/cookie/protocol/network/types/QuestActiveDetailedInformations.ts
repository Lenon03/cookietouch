import QuestActiveInformations from "@/protocol/network/types/QuestActiveInformations";
import QuestObjectiveInformations from "@/protocol/network/types/QuestObjectiveInformations";

export default class QuestActiveDetailedInformations extends QuestActiveInformations {
  public objectives: QuestObjectiveInformations[];
  public stepId: number;

  constructor(questId = 0, stepId = 0, objectives: QuestObjectiveInformations[] = null) {
    super(questId);
    this.objectives = objectives;
    this.stepId = stepId;

  }
}
