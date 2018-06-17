import AbstractFightDispellableEffect from "./AbstractFightDispellableEffect";
import Type from "./Type";

export default class FightDispellableEffectExtendedInformations extends Type {

  public actionid: number;
  public sourceid: number;
  public effect: AbstractFightDispellableEffect;

  constructor(actionid = 0, sourceid = 0, effect: AbstractFightDispellableEffect) {
    super();
    this.actionid = actionid;
    this.sourceid = sourceid;
    this.effect = effect;
  }
}
