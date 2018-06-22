import FightTemporaryBoostEffect from "@/protocol/network/types/FightTemporaryBoostEffect";

export default class FightTemporaryBoostStateEffect extends FightTemporaryBoostEffect {
  public stateId: number;

  constructor(uid = 0, targetId = 0, turnDuration = 0, dispelable = 1, spellId = 0,
              parentBoostUid = 0, delta = 0, stateId = 0) {
    super(uid, targetId, turnDuration, dispelable, spellId, parentBoostUid, delta);
    this.stateId = stateId;

  }
}
