import GuildFightJoinRequestMessage from "./GuildFightJoinRequestMessage";

export default class GuildFightTakePlaceRequestMessage extends GuildFightJoinRequestMessage {
  public replacedCharacterId: number;

  constructor(taxCollectorId = 0, replacedCharacterId = 0) {
    super(taxCollectorId);
    this.replacedCharacterId = replacedCharacterId;

  }
}
