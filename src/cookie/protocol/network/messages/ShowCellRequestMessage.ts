import Message from "@/protocol/network/messages/Message";

export default class ShowCellRequestMessage extends Message {
  public cellId: number;

  constructor(cellId = 0) {
    super();
    this.cellId = cellId;

  }
}
