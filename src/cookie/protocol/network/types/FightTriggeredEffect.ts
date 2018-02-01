import AbstractFightDispellableEffect from "./AbstractFightDispellableEffect";

export default class FightTriggeredEffect extends AbstractFightDispellableEffect {
  public param1: number;
  public param2: number;
  public param3: number;
  public delay: number;

  constructor(uid = 0, targetId = 0, turnDuration = 0, dispelable = 1,
              spellId = 0, parentBoostUid = 0, param1 = 0, param2 = 0,
              param3 = 0, delay = 0) {
    super(uid, targetId, turnDuration, dispelable, spellId, parentBoostUid);
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.delay = delay;

  }
}
