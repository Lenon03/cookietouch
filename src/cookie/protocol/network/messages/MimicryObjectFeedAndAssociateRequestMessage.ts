import Message from "./Message";

export default class MimicryObjectFeedAndAssociateRequestMessage extends Message {
  public mimicryUID: number;
  public mimicryPos: number;
  public foodUID: number;
  public foodPos: number;
  public hostUID: number;
  public hostPos: number;
  public preview: boolean;

  constructor(mimicryUID = 0, mimicryPos = 0, foodUID = 0, foodPos = 0, hostUID = 0, hostPos = 0, preview = false) {
    super();
    this.mimicryUID = mimicryUID;
    this.mimicryPos = mimicryPos;
    this.foodUID = foodUID;
    this.foodPos = foodPos;
    this.hostUID = hostUID;
    this.hostPos = hostPos;
    this.preview = preview;

  }
}
