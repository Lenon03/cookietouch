import Message from "@/protocol/network/messages/Message";
import EntityLook from "@/protocol/network/types/EntityLook";

export default class ContactLookMessage extends Message {
  public requestId: number;
  public playerName: string;
  public playerId: number;
  public look: EntityLook;

  constructor(requestId = 0, playerName = "", playerId = 0, look: EntityLook) {
    super();
    this.requestId = requestId;
    this.playerName = playerName;
    this.playerId = playerId;
    this.look = look;

  }
}
