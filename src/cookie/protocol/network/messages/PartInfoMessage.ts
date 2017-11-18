import ContentPart from "@protocol/network/types/ContentPart";
import Message from "./Message";
export default class PartInfoMessage extends Message {
  public part: ContentPart;
  public installationPercent: number;
  constructor(part: ContentPart, installationPercent = 0) {
    super();
    this.part = part;
    this.installationPercent = installationPercent;

  }
}
