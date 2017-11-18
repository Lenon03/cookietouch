import Message from "./Message";
export default class AllianceModificationStartedMessage extends Message {
  public canChangeName: boolean;
  public canChangeTag: boolean;
  public canChangeEmblem: boolean;
  constructor(canChangeName = false, canChangeTag = false, canChangeEmblem = false) {
    super();
    this.canChangeName = canChangeName;
    this.canChangeTag = canChangeTag;
    this.canChangeEmblem = canChangeEmblem;

  }
}
