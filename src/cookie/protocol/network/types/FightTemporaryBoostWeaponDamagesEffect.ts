import FightTemporaryBoostEffect from "./FightTemporaryBoostEffect";

export default class FightTemporaryBoostWeaponDamagesEffect extends FightTemporaryBoostEffect {
  public weaponTypeId: number;

  constructor(uid = 0, targetId = 0, turnDuration = 0, dispelable = 1, spellId = 0,
              parentBoostUid = 0, delta = 0, weaponTypeId = 0) {
    super(uid, targetId, turnDuration, dispelable, spellId, parentBoostUid, delta);
    this.weaponTypeId = weaponTypeId;
  }
}
