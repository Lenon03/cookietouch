import CharacterCharacteristicsInformations from "@/protocol/network/types/CharacterCharacteristicsInformations";
import Message from "@/protocol/network/messages/Message";

export default class CharacterStatsListMessage extends Message {
  public stats: CharacterCharacteristicsInformations;

  constructor(stats: CharacterCharacteristicsInformations) {
    super();
    this.stats = stats;

  }
}
