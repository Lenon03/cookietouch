import Message from "./Message";

export default class LockableShowCodeDialogMessage extends Message {
  public changeOrUse: boolean;
  public codeSize: number;

  constructor(changeOrUse = false, codeSize = 0) {
    super();
    this.changeOrUse = changeOrUse;
    this.codeSize = codeSize;

  }
}
