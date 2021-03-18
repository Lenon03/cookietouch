import AbstractFightDispellableEffect from "@/protocol/network/types/AbstractFightDispellableEffect";
import Type from "@/protocol/network/types/Type";

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
