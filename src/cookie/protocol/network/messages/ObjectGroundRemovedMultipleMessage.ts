import Message from "@/protocol/network/messages/Message";

export default class ObjectGroundRemovedMultipleMessage extends Message {
  public cells: number[];

  constructor(cells: number[]) {
    super();
    this.cells = cells;

  }
}
