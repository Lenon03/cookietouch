import Type from "@/protocol/network/types/Type";

export default class SkillActionDescription extends Type {

  public skillId: number;

  constructor(skillId = 0) {
    super();
    this.skillId = skillId;
  }
}
