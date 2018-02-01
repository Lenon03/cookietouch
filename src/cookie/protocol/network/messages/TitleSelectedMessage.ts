import Message from "./Message";

export default class TitleSelectedMessage extends Message {
  public titleId: number;

  constructor(titleId = 0) {
    super();
    this.titleId = titleId;

  }
}
