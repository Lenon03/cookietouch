export default class StatedElement {
  public elementId: number;
  public elementCellId: number;
  public elementState: number;

  constructor(elementId = 0, elementCellId = 0, elementState = 0) {
    this.elementId = elementId;
    this.elementCellId = elementCellId;
    this.elementState = elementState;
  }
}
