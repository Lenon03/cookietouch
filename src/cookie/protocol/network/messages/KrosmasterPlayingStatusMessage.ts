import Message from "@/protocol/network/messages/Message";

export default class KrosmasterPlayingStatusMessage extends Message {
  public playing: boolean;

  constructor(playing = false) {
    super();
    this.playing = playing;

  }
}
