import SkillActionDescription from "@/protocol/network/types/SkillActionDescription";
import Type from "@/protocol/network/types/Type";

export default class JobDescription extends Type {

  public skills: SkillActionDescription[];
  public jobId: number;

  constructor(jobId = 0, skillActionDescription: SkillActionDescription[] = null) {
    super();
    this.jobId = jobId;
    this.skills = skillActionDescription;
  }
}
