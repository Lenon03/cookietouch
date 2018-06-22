import Message from "@/protocol/network/messages/Message";

export default class DownloadCurrentSpeedMessage extends Message {
  public downloadSpeed: number;

  constructor(downloadSpeed = 0) {
    super();
    this.downloadSpeed = downloadSpeed;

  }
}
