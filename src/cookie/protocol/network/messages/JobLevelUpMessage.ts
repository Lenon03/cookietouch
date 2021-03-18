import Message from "@/protocol/network/messages/Message";
import JobDescription from "@/protocol/network/types/JobDescription";

export default class JobLevelUpMessage extends Message {
  public newLevel: number;
  public jobsDescription: JobDescription;

  constructor(newLevel = 0, jobsDescription: JobDescription) {
    super();
    this.newLevel = newLevel;
    this.jobsDescription = jobsDescription;

  }
}
