import Message from "@/protocol/network/messages/Message";

export default class JobCrafterDirectoryListRequestMessage extends Message {
  public jobId: number;

  constructor(jobId = 0) {
    super();
    this.jobId = jobId;

  }
}
