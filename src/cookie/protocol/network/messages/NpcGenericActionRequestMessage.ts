import Message from "@/protocol/network/messages/Message";

export default class NpcGenericActionRequestMessage extends Message {
  public npcId: number;
  public npcActionId: number;
  public npcMapId: number;

  constructor(npcId = 0, npcActionId = 0, npcMapId = 0) {
    super();
    this.npcId = npcId;
    this.npcActionId = npcActionId;
    this.npcMapId = npcMapId;

  }
}
