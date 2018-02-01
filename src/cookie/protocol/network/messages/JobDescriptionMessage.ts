import JobDescription from "@protocol/network/types/JobDescription";
import Message from "./Message";

export default class JobDescriptionMessage extends Message {
  public jobsDescription: JobDescription[];

  constructor(jobsDescription: JobDescription[]) {
    super();
    this.jobsDescription = jobsDescription;

  }
}
