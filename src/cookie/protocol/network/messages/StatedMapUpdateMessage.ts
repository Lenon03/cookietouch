import Message from "@/protocol/network/messages/Message";
import StatedElement from "@/protocol/network/types/StatedElement";

export default class StatedMapUpdateMessage extends Message {
  public statedElements: StatedElement[];

  constructor(statedElements: StatedElement[]) {
    super();
    this.statedElements = statedElements;

  }
}
