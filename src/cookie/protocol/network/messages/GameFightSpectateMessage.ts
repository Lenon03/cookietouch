import Message from "@/protocol/network/messages/Message";
import FightDispellableEffectExtendedInformations from "@/protocol/network/types/FightDispellableEffectExtendedInformations";
import GameActionMark from "@/protocol/network/types/GameActionMark";

export default class GameFightSpectateMessage extends Message {
  public effects: FightDispellableEffectExtendedInformations[];
  public marks: GameActionMark[];
  public gameTurn: number;

  constructor(gameTurn = 0, effects: FightDispellableEffectExtendedInformations[], marks: GameActionMark[]) {
    super();
    this.effects = effects;
    this.marks = marks;
    this.gameTurn = gameTurn;

  }
}
