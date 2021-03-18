import Message from "@/protocol/network/messages/Message";

export default class CharacterDeletionRequestMessage extends Message {
  public characterId: number;
  public secretAnswerHash: string;

  constructor(characterId = 0, secretAnswerHash = "") {
    super();
    this.characterId = characterId;
    this.secretAnswerHash = secretAnswerHash;

  }
}
