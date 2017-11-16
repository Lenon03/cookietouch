import Skills from "../../../../protocol/data/classes/Skills";
import SkillActionDescriptionCollect from "../../../../protocol/network/types/SkillActionDescriptionCollect";

export default class CollectSkillEntry {
  public id: number;
  public interactiveId: number;
  public name: string;
  public parentJobId: number;

  constructor(skill: SkillActionDescriptionCollect, skillData: Skills) {
    this.id = skill.skillId;
    this.interactiveId = skillData.interactiveId;
    this.name = skillData.nameId;
    this.parentJobId = skillData.parentJobId;
  }
}
