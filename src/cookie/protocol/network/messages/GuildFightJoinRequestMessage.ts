import Message from "./Message";

export default class GuildFightJoinRequestMessage extends Message {
  public taxCollectorId: number;

  constructor(taxCollectorId = 0) {
    super();
    this.taxCollectorId = taxCollectorId;

  }
}
