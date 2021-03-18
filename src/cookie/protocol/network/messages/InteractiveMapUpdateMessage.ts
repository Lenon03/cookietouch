import Message from "@/protocol/network/messages/Message";
import InteractiveElement from "@/protocol/network/types/InteractiveElement";

export default class InteractiveMapUpdateMessage extends Message {
  public interactiveElements: InteractiveElement[];

  constructor(interactiveElements: InteractiveElement[]) {
    super();
    this.interactiveElements = interactiveElements;

  }
}
