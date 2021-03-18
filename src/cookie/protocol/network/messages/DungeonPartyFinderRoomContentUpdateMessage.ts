import Message from "@/protocol/network/messages/Message";
import DungeonPartyFinderPlayer from "@/protocol/network/types/DungeonPartyFinderPlayer";

export default class DungeonPartyFinderRoomContentUpdateMessage extends Message {
  public addedPlayers: DungeonPartyFinderPlayer[];
  public removedPlayersIds: number[];
  public dungeonId: number;

  constructor(dungeonId = 0, addedPlayers: DungeonPartyFinderPlayer[], removedPlayersIds: number[]) {
    super();
    this.addedPlayers = addedPlayers;
    this.removedPlayersIds = removedPlayersIds;
    this.dungeonId = dungeonId;

  }
}
