import AbstractFightDispellableEffect from "@/protocol/network/types/AbstractFightDispellableEffect";

export default class FightTemporaryBoostEffect extends AbstractFightDispellableEffect {

  public delta: number;

  constructor(uid = 0, targetid = 0, turnduration = 0, dispelable = 1, spellid = 0, parentboostuid = 0, delta = 0) {
    super(uid, targetid, turnduration, dispelable, spellid, parentboostuid);
    this.delta = delta;
  }
}
