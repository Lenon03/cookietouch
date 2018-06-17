import ObjectUseMessage from "./ObjectUseMessage";

export default class ObjectUseOnCellMessage extends ObjectUseMessage {
  public cells: number;

  constructor(objectUID = 0, cells = 0) {
    super(objectUID);
    this.cells = cells;

  }
}
