import CharacterMinimalPlusLookInformations from "@protocol/network/types/CharacterMinimalPlusLookInformations";
import Message from "./Message";

export default class PrismFightDefenderAddMessage extends Message {
  public subAreaId: number;
  public fightId: number;
  public defender: CharacterMinimalPlusLookInformations;

  constructor(subAreaId = 0, fightId = 0, defender: CharacterMinimalPlusLookInformations) {
    super();
    this.subAreaId = subAreaId;
    this.fightId = fightId;
    this.defender = defender;

  }
}
