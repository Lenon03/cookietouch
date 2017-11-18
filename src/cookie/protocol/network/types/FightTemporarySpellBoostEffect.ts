import FightTemporaryBoostEffect from "./FightTemporaryBoostEffect";
export default class FightTemporarySpellBoostEffect extends FightTemporaryBoostEffect {
  public boostedSpellId: number;
  constructor(uid = 0, targetId = 0, turnDuration = 0, dispelable = 1,
              spellId = 0, parentBoostUid = 0, delta = 0, boostedSpellId = 0) {
    super(uid, targetId, turnDuration, dispelable, spellId, parentBoostUid, delta);
    this.boostedSpellId = boostedSpellId;

  }
}
