import InteractiveElementSkill from "./InteractiveElementSkill";

export default class InteractiveElement {
  public enabledSkills: InteractiveElementSkill[];
  public disabledSkills: InteractiveElementSkill[];
  public elementId: number;
  public elementTypeId: number;
  public _name: string;

  constructor(elementId = 0, elementTypeId = 0,
              enabledSkills: InteractiveElementSkill[] = null, disabledSkills: InteractiveElementSkill[] = null) {
    this.elementId = elementId;
    this.elementTypeId = elementTypeId;
    this.enabledSkills = enabledSkills;
    this.disabledSkills = disabledSkills;
  }
}
