import Message from "./Message";

export default class ConnectionFailedMessage extends Message {
  public reason: string;

  constructor(reason: string) {
    super();
  }
}
