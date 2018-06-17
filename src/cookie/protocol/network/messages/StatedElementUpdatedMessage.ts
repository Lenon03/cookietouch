import StatedElement from "@protocol/network/types/StatedElement";
import Message from "./Message";

export default class StatedElementUpdatedMessage extends Message {
  public statedElement: StatedElement;

  constructor(statedElement: StatedElement) {
    super();
    this.statedElement = statedElement;

  }
}
