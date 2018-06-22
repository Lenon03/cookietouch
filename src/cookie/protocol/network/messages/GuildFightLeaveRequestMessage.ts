import Message from "@/protocol/network/messages/Message";

export default class GuildFightLeaveRequestMessage extends Message {
  public taxCollectorId: number;
  public characterId: number;

  constructor(taxCollectorId = 0, characterId = 0) {
    super();
    this.taxCollectorId = taxCollectorId;
    this.characterId = characterId;

  }
}
