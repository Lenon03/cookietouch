import Type from "./Type";

export default class AbstractFightDispellableEffect extends Type {

  public uid: number;
  public targetId: number;
  public turnDuration: number;
  public dispelable: number;
  public spellId: number;
  public parentBoostUid: number;

  constructor(uid = 0, targetId = 0, turnDuration = 0, dispelable = 1, spellId = 0, parentBoostUid = 0) {
    super();
    this.uid = uid;
    this.targetId = targetId;
    this.turnDuration = turnDuration;
    this.dispelable = dispelable;
    this.spellId = spellId;
    this.parentBoostUid = parentBoostUid;
  }
}
