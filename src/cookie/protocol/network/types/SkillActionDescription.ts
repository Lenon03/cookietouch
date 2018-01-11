import Type from "./Type";

export default class SkillActionDescription extends Type {

  public skillId: number;

  constructor(skillId = 0) {
    super();
    this.skillId = skillId;
  }
}
