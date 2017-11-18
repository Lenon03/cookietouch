import AbstractFightDispellableEffect from "./AbstractFightDispellableEffect";

export default class FightDispellableEffectExtendedInformations {

  public actionid: number;
  public sourceid: number;
  public effect: AbstractFightDispellableEffect;

  constructor(actionid = 0, sourceid = 0, effect: AbstractFightDispellableEffect) {
    this.actionid = actionid;
    this.sourceid = sourceid;
    this.effect = effect;
  }
}
