import Message from "@/protocol/network/messages/Message";
import EntityLook from "@/protocol/network/types/EntityLook";

export default class GameContextRefreshEntityLookMessage extends Message {
  public id: number;
  public look: EntityLook;

  constructor(id = 0, look: EntityLook) {
    super();
    this.id = id;
    this.look = look;

  }
}
