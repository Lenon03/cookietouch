import InteractiveElement from "@/protocol/network/types/InteractiveElement";
import Message from "@/protocol/network/messages/Message";

export default class InteractiveMapUpdateMessage extends Message {
  public interactiveElements: InteractiveElement[];

  constructor(interactiveElements: InteractiveElement[]) {
    super();
    this.interactiveElements = interactiveElements;

  }
}
