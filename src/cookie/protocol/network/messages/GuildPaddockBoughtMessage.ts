import Message from "@/protocol/network/messages/Message";
import PaddockContentInformations from "@/protocol/network/types/PaddockContentInformations";

export default class GuildPaddockBoughtMessage extends Message {
  public paddockInfo: PaddockContentInformations;

  constructor(paddockInfo: PaddockContentInformations) {
    super();
    this.paddockInfo = paddockInfo;

  }
}
