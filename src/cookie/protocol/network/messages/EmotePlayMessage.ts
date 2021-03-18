import EmotePlayAbstractMessage from "@/protocol/network/messages/EmotePlayAbstractMessage";

export default class EmotePlayMessage extends EmotePlayAbstractMessage {
  public actorId: number;
  public accountId: number;

  constructor(emoteId = 0, emoteStartTime = 0, actorId = 0, accountId = 0) {
    super(emoteId, emoteStartTime);
    this.actorId = actorId;
    this.accountId = accountId;

  }
}
