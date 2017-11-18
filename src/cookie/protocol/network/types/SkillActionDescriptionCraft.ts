import SkillActionDescription from "./SkillActionDescription";
export default class SkillActionDescriptionCraft extends SkillActionDescription {
  public maxSlots: number;
  public probability: number;
  constructor(skillId = 0, maxSlots = 0, probability = 0) {
    super(skillId);
    this.maxSlots = maxSlots;
    this.probability = probability;

  }
}
