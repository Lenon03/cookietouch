import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";

export default class GameActionFightSummonMessage extends AbstractGameActionMessage {
  public summon: GameFightFighterInformations;

  constructor(actionId = 0, sourceId = 0, summon: GameFightFighterInformations) {
    super(actionId, sourceId);
    this.summon = summon;
  }
}
