import InteractiveElementSkill from "@/protocol/network/types/InteractiveElementSkill";
import Type from "@/protocol/network/types/Type";

export default class InteractiveElement extends Type {
  public enabledSkills: InteractiveElementSkill[];
  public disabledSkills: InteractiveElementSkill[];
  public elementId: number;
  public elementTypeId: number;
  public _name: string;

  constructor(
    name = "",
    elementId = 0,
    elementTypeId = 0,
    enabledSkills: InteractiveElementSkill[] = [],
    disabledSkills: InteractiveElementSkill[] = []
  ) {
    super();
    this._name = name;
    this.enabledSkills = enabledSkills;
    this.disabledSkills = disabledSkills;
    this.elementId = elementId;
    this.elementTypeId = elementTypeId;
  }
}
