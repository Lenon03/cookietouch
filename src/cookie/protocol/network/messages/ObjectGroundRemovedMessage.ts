import Message from "./Message";

export default class ObjectGroundRemovedMessage extends Message {
  public cell: number;

  constructor(cell = 0) {
    super();
    this.cell = cell;

  }
}
