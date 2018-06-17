import LeaveDialogMessage from "./LeaveDialogMessage";

export default class ExchangeLeaveMessage extends LeaveDialogMessage {
  public success: boolean;

  constructor(dialogType = 0, success = false) {
    super(dialogType);
    this.success = success;

  }
}
