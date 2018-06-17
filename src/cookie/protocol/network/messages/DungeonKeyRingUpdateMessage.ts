import Message from "./Message";

export default class DungeonKeyRingUpdateMessage extends Message {
  public dungeonId: number;
  public available: boolean;

  constructor(dungeonId = 0, available = false) {
    super();
    this.dungeonId = dungeonId;
    this.available = available;

  }
}
