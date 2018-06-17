import InteractiveElementSkill from "./InteractiveElementSkill";
import Type from "./Type";

export default class InteractiveElement extends Type {
  public enabledSkills: InteractiveElementSkill[];
  public disabledSkills: InteractiveElementSkill[];
  public elementId: number;
  public elementTypeId: number;
  public _name: string;

  constructor(elementId = 0, elementTypeId = 0,
              enabledSkills: InteractiveElementSkill[] = null,
              disabledSkills: InteractiveElementSkill[] = null) {
    super();
    this.enabledSkills = enabledSkills;
    this.disabledSkills = disabledSkills;
    this.elementId = elementId;
    this.elementTypeId = elementTypeId;
  }
}
