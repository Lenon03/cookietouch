import QuestActiveInformations from "@/protocol/network/types/QuestActiveInformations";
import Message from "@/protocol/network/messages/Message";

export default class QuestStepInfoMessage extends Message {
  public infos: QuestActiveInformations;

  constructor(infos: QuestActiveInformations) {
    super();
    this.infos = infos;

  }
}
