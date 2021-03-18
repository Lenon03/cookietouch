import Message from "@/protocol/network/messages/Message";

export default class QuestStepStartedMessage extends Message {
  public questId: number;
  public stepId: number;

  constructor(questId = 0, stepId = 0) {
    super();
    this.questId = questId;
    this.stepId = stepId;

  }
}
