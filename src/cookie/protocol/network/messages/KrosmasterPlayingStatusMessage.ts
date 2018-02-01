import Message from "./Message";

export default class KrosmasterPlayingStatusMessage extends Message {
  public playing: boolean;

  constructor(playing = false) {
    super();
    this.playing = playing;

  }
}
