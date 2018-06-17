import Message from "./Message";

export default class CurrentMapMessage extends Message {
  public mapId: number;
  public mapKey: string;

  constructor(mapId = 0, mapKey = "") {
    super();
    this.mapId = mapId;
    this.mapKey = mapKey;

  }
}
