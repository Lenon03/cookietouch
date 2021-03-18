import Message from "@/protocol/network/messages/Message";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class MimicryObjectPreviewMessage extends Message {
  public result: ObjectItem;

  constructor(result: ObjectItem) {
    super();
    this.result = result;

  }
}
