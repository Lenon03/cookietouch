import AbstractFightDispellableEffect from "@/protocol/network/types/AbstractFightDispellableEffect";
import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class GameActionFightDispellableEffectMessage extends AbstractGameActionMessage {
  public effect: AbstractFightDispellableEffect;

  constructor(actionId = 0, sourceId = 0, effect: AbstractFightDispellableEffect) {
    super(actionId, sourceId);
    this.effect = effect;

  }
}
