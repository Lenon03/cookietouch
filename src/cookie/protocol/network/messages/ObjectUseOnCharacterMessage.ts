import ObjectUseMessage from "@/protocol/network/messages/ObjectUseMessage";

export default class ObjectUseOnCharacterMessage extends ObjectUseMessage {
  public characterId: number;

  constructor(objectUID = 0, characterId = 0) {
    super(objectUID);
    this.characterId = characterId;

  }
}
