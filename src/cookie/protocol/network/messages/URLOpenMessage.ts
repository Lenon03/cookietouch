import Message from "@/protocol/network/messages/Message";

export default class URLOpenMessage extends Message {
  public urlId: number;

  constructor(urlId = 0) {
    super();
    this.urlId = urlId;

  }
}
