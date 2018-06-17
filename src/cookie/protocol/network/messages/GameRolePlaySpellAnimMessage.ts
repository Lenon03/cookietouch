import Message from "./Message";

export default class GameRolePlaySpellAnimMessage extends Message {
  public casterId: number;
  public targetCellId: number;
  public spellId: number;
  public spellLevel: number;

  constructor(casterId = 0, targetCellId = 0, spellId = 0, spellLevel = 0) {
    super();
    this.casterId = casterId;
    this.targetCellId = targetCellId;
    this.spellId = spellId;
    this.spellLevel = spellLevel;

  }
}
