import Message from "./Message";

export default class MountEquipedErrorMessage extends Message {
  public errorType: number;

  constructor(errorType = 0) {
    super();
    this.errorType = errorType;

  }
}
