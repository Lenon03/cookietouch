import SkillActionDescription from "./SkillActionDescription";

export default class SkillActionDescriptionTimed extends SkillActionDescription {

  public time: number;

  constructor(skillId = 0, time = 0) {
    super(skillId);
    this.time = time;
  }
}
