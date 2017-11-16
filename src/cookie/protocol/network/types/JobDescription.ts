import SkillActionDescription from "./SkillActionDescription";

export default class JobDescription {

  public skills: SkillActionDescription[];
  public jobId: number;
  constructor(jobId = 0, skillActionDescription: SkillActionDescription[] = null) {
    this.jobId = jobId;
    this.skills = skillActionDescription;
  }
}
