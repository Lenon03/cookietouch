import QuestObjectiveInformations from "./QuestObjectiveInformations";

export default class QuestObjectiveInformationsWithCompletion extends QuestObjectiveInformations {
  public curCompletion: number;
  public maxCompletion: number;

  constructor(objectiveId = 0, objectiveStatus = false, curCompletion = 0,
              maxCompletion = 0, dialogParams: string[] = null) {
    super(objectiveId, objectiveStatus, dialogParams);
    this.curCompletion = curCompletion;
    this.maxCompletion = maxCompletion;

  }
}
