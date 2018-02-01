import DungeonPartyFinderPlayer from "@protocol/network/types/DungeonPartyFinderPlayer";
import Message from "./Message";

export default class DungeonPartyFinderRoomContentMessage extends Message {
  public players: DungeonPartyFinderPlayer[];
  public dungeonId: number;

  constructor(dungeonId = 0, players: DungeonPartyFinderPlayer[]) {
    super();
    this.players = players;
    this.dungeonId = dungeonId;

  }
}
