import Message from "@/protocol/network/messages/Message";
import JobExperience from "@/protocol/network/types/JobExperience";

export default class JobExperienceMultiUpdateMessage extends Message {
  public experiencesUpdate: JobExperience[];

  constructor(experiencesUpdate: JobExperience[]) {
    super();
    this.experiencesUpdate = experiencesUpdate;

  }
}
