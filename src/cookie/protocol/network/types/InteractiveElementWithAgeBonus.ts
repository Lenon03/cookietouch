import InteractiveElement from "@/protocol/network/types/InteractiveElement";
import InteractiveElementSkill from "@/protocol/network/types/InteractiveElementSkill";

export default class InteractiveElementWithAgeBonus extends InteractiveElement {
  public ageBonus: number;

  constructor(elementId = 0, elementTypeId = 0, ageBonus = 0,
              enabledSkills: InteractiveElementSkill[] = null, disabledSkills: InteractiveElementSkill[] = null) {
    super(elementId, elementTypeId, enabledSkills, disabledSkills);
    this.ageBonus = ageBonus;

  }
}
