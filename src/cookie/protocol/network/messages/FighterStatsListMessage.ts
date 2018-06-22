import Message from "@/protocol/network/messages/Message";
import CharacterCharacteristicsInformations from "@/protocol/network/types/CharacterCharacteristicsInformations";

export default class FighterStatsListMessage extends Message {
  public stats: CharacterCharacteristicsInformations;

  constructor(stats: CharacterCharacteristicsInformations) {
    super();
    this.stats = stats;

  }
}
