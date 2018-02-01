import Message from "./Message";

export default class BasicWhoIsNoMatchMessage extends Message {
  public search: string;

  constructor(search = "") {
    super();
    this.search = search;

  }
}
