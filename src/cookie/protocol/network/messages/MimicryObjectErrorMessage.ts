import ObjectErrorMessage from "./ObjectErrorMessage";

export default class MimicryObjectErrorMessage extends ObjectErrorMessage {
  public preview: boolean;
  public errorCode: number;

  constructor(reason = 0, preview = false, errorCode = 0) {
    super(reason);
    this.preview = preview;
    this.errorCode = errorCode;

  }
}
