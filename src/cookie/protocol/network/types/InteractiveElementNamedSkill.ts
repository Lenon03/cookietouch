import InteractiveElementSkill from "./InteractiveElementSkill";

export default class InteractiveElementNamedSkill extends InteractiveElementSkill {
  public nameId: number;

  constructor(skillId = 0, skillInstanceUid = 0, nameId = 0) {
    super(skillId, skillInstanceUid);
    this.nameId = nameId;
  }
}
