import CharacterMinimalPlusLookInformations from "@protocol/network/types/CharacterMinimalPlusLookInformations";
import Message from "./Message";
export default class GuildFightPlayersHelpersJoinMessage extends Message {
  public fightId: number;
  public playerInfo: CharacterMinimalPlusLookInformations;
  constructor(fightId = 0, playerInfo: CharacterMinimalPlusLookInformations) {
    super();
    this.fightId = fightId;
    this.playerInfo = playerInfo;

  }
}
