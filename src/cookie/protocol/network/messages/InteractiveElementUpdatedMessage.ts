import InteractiveElement from "@protocol/network/types/InteractiveElement";
import Message from "./Message";

export default class InteractiveElementUpdatedMessage extends Message {
  public interactiveElement: InteractiveElement;

  constructor(interactiveElement: InteractiveElement) {
    super();
    this.interactiveElement = interactiveElement;

  }
}
