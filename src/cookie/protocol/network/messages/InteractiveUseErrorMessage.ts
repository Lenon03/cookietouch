import Message from "./Message";

export default class InteractiveUseErrorMessage extends Message {
  public elemId: number;
  public skillInstanceUid: number;

  constructor(elemId = 0, skillInstanceUid = 0) {
    super();
    this.elemId = elemId;
    this.skillInstanceUid = skillInstanceUid;

  }
}
