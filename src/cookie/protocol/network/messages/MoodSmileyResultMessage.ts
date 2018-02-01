import Message from "./Message";

export default class MoodSmileyResultMessage extends Message {
  public resultCode: number;
  public smileyId: number;

  constructor(resultCode = 1, smileyId = 0) {
    super();
    this.resultCode = resultCode;
    this.smileyId = smileyId;

  }
}
