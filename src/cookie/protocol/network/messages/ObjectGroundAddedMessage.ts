import Message from "./Message";

export default class ObjectGroundAddedMessage extends Message {
  public cellId: number;
  public objectGID: number;

  constructor(cellId = 0, objectGID = 0) {
    super();
    this.cellId = cellId;
    this.objectGID = objectGID;

  }
}
