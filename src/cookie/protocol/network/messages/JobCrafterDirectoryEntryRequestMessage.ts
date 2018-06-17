import Message from "./Message";

export default class JobCrafterDirectoryEntryRequestMessage extends Message {
  public playerId: number;

  constructor(playerId = 0) {
    super();
    this.playerId = playerId;

  }
}
