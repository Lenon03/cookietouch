import Message from "./Message";

export default class EmoteListMessage extends Message {
  public emoteIds: number[];

  constructor(emoteIds: number[]) {
    super();
    this.emoteIds = emoteIds;

  }
}
