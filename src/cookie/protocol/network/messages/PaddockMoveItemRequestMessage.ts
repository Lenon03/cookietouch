import Message from "@/protocol/network/messages/Message";

export default class PaddockMoveItemRequestMessage extends Message {
  public oldCellId: number;
  public newCellId: number;

  constructor(oldCellId = 0, newCellId = 0) {
    super();
    this.oldCellId = oldCellId;
    this.newCellId = newCellId;

  }
}
