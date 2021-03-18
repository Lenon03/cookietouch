import InteractiveElement from "@/protocol/network/types/InteractiveElement";
import InteractiveElementSkill from "@/protocol/network/types/InteractiveElementSkill";

export default class InteractiveElementWithAgeBonus extends InteractiveElement {
  public ageBonus: number;

  constructor(
    name = "",
    elementId = 0,
    elementTypeId = 0,
    ageBonus = 0,
    enabledSkills: InteractiveElementSkill[] = [],
    disabledSkills: InteractiveElementSkill[] = []
  ) {
    super(name, elementId, elementTypeId, enabledSkills, disabledSkills);
    this.ageBonus = ageBonus;
  }
}
