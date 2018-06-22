import Message from "@/protocol/network/messages/Message";
import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";

export default class TaxCollectorDialogQuestionBasicMessage extends Message {
  public guildInfo: BasicGuildInformations;

  constructor(guildInfo: BasicGuildInformations) {
    super();
    this.guildInfo = guildInfo;

  }
}
