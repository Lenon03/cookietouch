import Type from "@/protocol/network/types/Type";

export default class EntityDispositionInformations extends Type {
  public cellId: number;
  public direction: number;

  constructor(cellId = 0, direction = 0) {
    super();
    this.cellId = cellId;
    this.direction = direction;
  }
}
