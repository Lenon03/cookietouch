import Message from "./Message";

export default class GameMapMovementRequestMessage extends Message {
  public keyMovements: number[];
  public mapId: number;

  constructor(mapId = 0, keyMovements: number[]) {
    super();
    this.keyMovements = keyMovements;
    this.mapId = mapId;

  }
}
