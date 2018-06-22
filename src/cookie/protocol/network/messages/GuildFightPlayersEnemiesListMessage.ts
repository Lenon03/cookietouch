import Message from "@/protocol/network/messages/Message";
import CharacterMinimalPlusLookInformations from "@/protocol/network/types/CharacterMinimalPlusLookInformations";

export default class GuildFightPlayersEnemiesListMessage extends Message {
  public playerInfo: CharacterMinimalPlusLookInformations[];
  public fightId: number;

  constructor(fightId = 0, playerInfo: CharacterMinimalPlusLookInformations[]) {
    super();
    this.playerInfo = playerInfo;
    this.fightId = fightId;

  }
}
