import Message from "@/protocol/network/messages/Message";

export default class QuestStartRequestMessage extends Message {
  public questId: number;

  constructor(questId = 0) {
    super();
    this.questId = questId;

  }
}
