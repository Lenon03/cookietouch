import BasicGuildInformations from "@protocol/network/types/BasicGuildInformations";
import Message from "./Message";

export default class TaxCollectorDialogQuestionBasicMessage extends Message {
  public guildInfo: BasicGuildInformations;

  constructor(guildInfo: BasicGuildInformations) {
    super();
    this.guildInfo = guildInfo;

  }
}
