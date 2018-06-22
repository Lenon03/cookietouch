import Message from "@/protocol/network/messages/Message";
import ContentPart from "@/protocol/network/types/ContentPart";

export default class PartInfoMessage extends Message {
  public part: ContentPart;
  public installationPercent: number;

  constructor(part: ContentPart, installationPercent = 0) {
    super();
    this.part = part;
    this.installationPercent = installationPercent;

  }
}
