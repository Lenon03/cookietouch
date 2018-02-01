import Message from "./Message";

export default class GameActionFightNoSpellCastMessage extends Message {
  public spellLevelId: number;

  constructor(spellLevelId = 0) {
    super();
    this.spellLevelId = spellLevelId;

  }
}
