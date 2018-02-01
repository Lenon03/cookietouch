import AbstractFightDispellableEffect from "./AbstractFightDispellableEffect";

export default class FightTemporarySpellImmunityEffect extends AbstractFightDispellableEffect {
  public immuneSpellId: number;

  constructor(uid = 0, targetId = 0, turnDuration = 0, dispelable = 1,
              spellId = 0, parentBoostUid = 0, immuneSpellId = 0) {
    super(uid, targetId, turnDuration, dispelable, spellId, parentBoostUid);
    this.immuneSpellId = immuneSpellId;

  }
}
