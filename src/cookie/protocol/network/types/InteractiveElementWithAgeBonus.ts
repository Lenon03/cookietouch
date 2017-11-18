import InteractiveElement from "./InteractiveElement";
import InteractiveElementSkill from "./InteractiveElementSkill";

export default class InteractiveElementWithAgeBonus extends InteractiveElement {
  public ageBonus: number;
  constructor(elementId = 0, elementTypeId = 0, ageBonus = 0,
              enabledSkills: InteractiveElementSkill[] = null, disabledSkills: InteractiveElementSkill[] = null) {
    super(elementId, elementTypeId, enabledSkills, disabledSkills);
    this.ageBonus = ageBonus;

  }
}
