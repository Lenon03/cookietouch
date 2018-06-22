import Message from "@/protocol/network/messages/Message";

export default class JobListedUpdateMessage extends Message {
  public addedOrDeleted: boolean;
  public jobId: number;

  constructor(addedOrDeleted = false, jobId = 0) {
    super();
    this.addedOrDeleted = addedOrDeleted;
    this.jobId = jobId;

  }
}
