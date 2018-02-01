import Message from "./Message";

export default class CharacterReportMessage extends Message {
  public reportedId: number;
  public reason: number;

  constructor(reportedId = 0, reason = 0) {
    super();
    this.reportedId = reportedId;
    this.reason = reason;

  }
}
