import Message from "./Message";

export default class NpcDialogCreationMessage extends Message {
  public mapId: number;
  public npcId: number;

  constructor(mapId = 0, npcId = 0) {
    super();
    this.mapId = mapId;
    this.npcId = npcId;

  }
}
