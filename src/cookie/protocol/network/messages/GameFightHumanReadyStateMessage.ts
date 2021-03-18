import Message from "@/protocol/network/messages/Message";

export default class GameFightHumanReadyStateMessage extends Message {
  public characterId: number;
  public isReady: boolean;

  constructor(characterId = 0, isReady = false) {
    super();
    this.characterId = characterId;
    this.isReady = isReady;

  }
}
