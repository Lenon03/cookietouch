import Message from "./Message";

export default class StartupActionFinishedMessage extends Message {
  public success: boolean;
  public actionId: number;
  public automaticAction: boolean;

  constructor(success = false, actionId = 0, automaticAction = false) {
    super();
    this.success = success;
    this.actionId = actionId;
    this.automaticAction = automaticAction;

  }
}
