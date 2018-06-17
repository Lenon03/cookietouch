import CharacterCharacteristicsInformations from "@protocol/network/types/CharacterCharacteristicsInformations";
import Message from "./Message";

export default class FighterStatsListMessage extends Message {
  public stats: CharacterCharacteristicsInformations;

  constructor(stats: CharacterCharacteristicsInformations) {
    super();
    this.stats = stats;

  }
}
