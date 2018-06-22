import Message from "@/protocol/network/messages/Message";
import StatedElement from "@/protocol/network/types/StatedElement";

export default class StatedElementUpdatedMessage extends Message {
  public statedElement: StatedElement;

  constructor(statedElement: StatedElement) {
    super();
    this.statedElement = statedElement;

  }
}
