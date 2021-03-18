import Message from "@/protocol/network/messages/Message";

export default class QuestObjectiveValidationMessage extends Message {
  public questId: number;
  public objectiveId: number;

  constructor(questId = 0, objectiveId = 0) {
    super();
    this.questId = questId;
    this.objectiveId = objectiveId;

  }
}
