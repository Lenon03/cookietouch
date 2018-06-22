import Message from "@/protocol/network/messages/Message";
import JobDescription from "@/protocol/network/types/JobDescription";

export default class JobDescriptionMessage extends Message {
  public jobsDescription: JobDescription[];

  constructor(jobsDescription: JobDescription[]) {
    super();
    this.jobsDescription = jobsDescription;

  }
}
