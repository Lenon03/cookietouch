import Message from "@/protocol/network/messages/Message";

export default class StartupActionsObjetAttributionMessage extends Message {
  public actionId: number;
  public characterId: number;

  constructor(actionId = 0, characterId = 0) {
    super();
    this.actionId = actionId;
    this.characterId = characterId;

  }
}
