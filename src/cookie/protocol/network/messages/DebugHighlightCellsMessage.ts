import Message from "@/protocol/network/messages/Message";

export default class DebugHighlightCellsMessage extends Message {
  public cells: number[];
  public color: number;

  constructor(color = 0, cells: number[]) {
    super();
    this.cells = cells;
    this.color = color;

  }
}
