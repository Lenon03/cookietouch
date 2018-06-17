import SkillActionDescription from "./SkillActionDescription";
import Type from "./Type";

export default class JobDescription extends Type {

  public skills: SkillActionDescription[];
  public jobId: number;

  constructor(jobId = 0, skillActionDescription: SkillActionDescription[] = null) {
    super();
    this.jobId = jobId;
    this.skills = skillActionDescription;
  }
}
