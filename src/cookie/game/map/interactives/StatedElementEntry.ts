import StatedElement from "@protocol/network/types/StatedElement";

export default class StatedElementEntry {
  public cellId: number;
  public id: number;
  public state: number;

  constructor(elem: StatedElement) {
    this.id = elem.elementId;
    this.cellId = elem.elementCellId;
    this.state = elem.elementState;
  }
}
