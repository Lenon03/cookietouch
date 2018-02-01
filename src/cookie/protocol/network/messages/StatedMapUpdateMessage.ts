import StatedElement from "@protocol/network/types/StatedElement";
import Message from "./Message";

export default class StatedMapUpdateMessage extends Message {
  public statedElements: StatedElement[];

  constructor(statedElements: StatedElement[]) {
    super();
    this.statedElements = statedElements;

  }
}
