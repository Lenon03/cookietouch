import SkillActionDescriptionTimed from "./SkillActionDescriptionTimed";

export default class SkillActionDescriptionCollect extends SkillActionDescriptionTimed {

  public min: number;
  public max: number;

  constructor(skillId = 0, time = 0, min = 0, max = 0) {
    super(skillId, time);
    this.min = min;
    this.max = max;
  }
}
