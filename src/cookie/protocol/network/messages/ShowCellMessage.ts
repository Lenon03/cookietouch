import Message from "./Message";

export default class ShowCellMessage extends Message {
  public sourceId: number;
  public cellId: number;

  constructor(sourceId = 0, cellId = 0) {
    super();
    this.sourceId = sourceId;
    this.cellId = cellId;

  }
}
