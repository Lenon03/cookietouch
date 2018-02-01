import CharacterSelectionMessage from "./CharacterSelectionMessage";

export default class CharacterSelectionWithRelookMessage extends CharacterSelectionMessage {
  public cosmeticId: number;

  constructor(id = 0, cosmeticId = 0) {
    super(id);
    this.cosmeticId = cosmeticId;

  }
}
