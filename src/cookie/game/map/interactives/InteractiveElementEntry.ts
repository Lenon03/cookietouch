import InteractiveElement from "@/protocol/network/types/InteractiveElement";
import SkillEntry from "@/game/map/interactives/skills/SkillEntry";

export default class InteractiveElementEntry {
  public id: number;
  public elementTypeId: number;
  public name: string;
  public enabledSkills: SkillEntry[] = [];
  public disabledSkills: SkillEntry[] = [];

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

  get usable(): boolean {
    return this.enabledSkills.length > 0;
  }
}
