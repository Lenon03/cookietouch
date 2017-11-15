export default class EntityDispositionInformations {
  public cellId: number;
  public direction: number;

  constructor(cellId = 0, direction = 0) {
    this.cellId = cellId;
    this.direction = direction;
  }
}
