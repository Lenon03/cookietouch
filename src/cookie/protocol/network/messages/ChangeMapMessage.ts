import Message from "./Message";

export default class ChangeMapMessage extends Message {
  public mapId: number;

  constructor(mapId = 0) {
    super();
    this.mapId = mapId;

  }
}
