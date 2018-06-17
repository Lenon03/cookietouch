import Message from "./Message";

export default class QuestObjectiveValidatedMessage extends Message {
  public questId: number;
  public objectiveId: number;

  constructor(questId = 0, objectiveId = 0) {
    super();
    this.questId = questId;
    this.objectiveId = objectiveId;

  }
}
