import Message from "./Message";

export default class CharacterReplayRequestMessage extends Message {
  public characterId: number;

  constructor(characterId = 0) {
    super();
    this.characterId = characterId;

  }
}
