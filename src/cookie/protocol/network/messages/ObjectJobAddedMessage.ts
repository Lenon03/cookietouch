import Message from "./Message";

export default class ObjectJobAddedMessage extends Message {
  public jobId: number;

  constructor(jobId = 0) {
    super();
    this.jobId = jobId;

  }
}
