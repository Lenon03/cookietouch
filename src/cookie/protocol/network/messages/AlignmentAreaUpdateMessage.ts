import Message from "./Message";

export default class AlignmentAreaUpdateMessage extends Message {
  public areaId: number;
  public side: number;

  constructor(areaId = 0, side = 0) {
    super();
    this.areaId = areaId;
    this.side = side;

  }
}
