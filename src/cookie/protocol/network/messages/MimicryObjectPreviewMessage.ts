import ObjectItem from "@/protocol/network/types/ObjectItem";
import Message from "@/protocol/network/messages/Message";

export default class MimicryObjectPreviewMessage extends Message {
  public result: ObjectItem;

  constructor(result: ObjectItem) {
    super();
    this.result = result;

  }
}
