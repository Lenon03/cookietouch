import Message from "./Message";

export default class KrosmasterAuthTokenMessage extends Message {
  public token: string;

  constructor(token = "") {
    super();
    this.token = token;

  }
}
