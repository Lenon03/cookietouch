import InteractiveElement from "../../../protocol/network/types/InteractiveElement";
import SkillEntry from "./skills/SkillEntry";

export default class InteractiveElementEntry {
  public id: number;
  public elementTypeId: number;
  public name: string;
  public enabledSkills: SkillEntry[] = [];
  public disabledSkills: SkillEntry[] = [];

  get usable(): boolean {
    return this.enabledSkills.length > 0;
  }

  constructor(elem: InteractiveElement) {
    this.id = elem.elementId;
    this.elementTypeId = elem.elementTypeId;
    this.name = elem._name;

    for (const e of elem.enabledSkills) {
      this.enabledSkills.push(new SkillEntry(e));
    }

    for (const e of elem.disabledSkills) {
      this.disabledSkills.push(new SkillEntry(e));
    }
  }
}
