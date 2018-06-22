import Message from "@/protocol/network/messages/Message";
import InteractiveElement from "@/protocol/network/types/InteractiveElement";

export default class InteractiveElementUpdatedMessage extends Message {
  public interactiveElement: InteractiveElement;

  constructor(interactiveElement: InteractiveElement) {
    super();
    this.interactiveElement = interactiveElement;

  }
}
