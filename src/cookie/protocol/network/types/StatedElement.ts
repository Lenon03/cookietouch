import Type from "./Type";

export default class StatedElement extends Type {
  public elementId: number;
  public elementCellId: number;
  public elementState: number;

  constructor(elementId = 0, elementCellId = 0, elementState = 0) {
    super();
    this.elementId = elementId;
    this.elementCellId = elementCellId;
    this.elementState = elementState;
  }
}
