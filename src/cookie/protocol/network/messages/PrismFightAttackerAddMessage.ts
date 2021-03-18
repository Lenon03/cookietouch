import Message from "@/protocol/network/messages/Message";
import CharacterMinimalPlusLookInformations from "@/protocol/network/types/CharacterMinimalPlusLookInformations";

export default class PrismFightAttackerAddMessage extends Message {
  public subAreaId: number;
  public fightId: number;
  public attacker: CharacterMinimalPlusLookInformations;

  constructor(subAreaId = 0, fightId = 0, attacker: CharacterMinimalPlusLookInformations) {
    super();
    this.subAreaId = subAreaId;
    this.fightId = fightId;
    this.attacker = attacker;

  }
}
