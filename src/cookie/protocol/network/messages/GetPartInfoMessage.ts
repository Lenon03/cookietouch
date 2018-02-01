import Message from "./Message";

export default class GetPartInfoMessage extends Message {
  public id: string;

  constructor(id = "") {
    super();
    this.id = id;

  }
}
