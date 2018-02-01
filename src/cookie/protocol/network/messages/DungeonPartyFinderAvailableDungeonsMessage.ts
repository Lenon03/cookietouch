import Message from "./Message";

export default class DungeonPartyFinderAvailableDungeonsMessage extends Message {
  public dungeonIds: number[];

  constructor(dungeonIds: number[]) {
    super();
    this.dungeonIds = dungeonIds;

  }
}
