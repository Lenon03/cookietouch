import GameFightSpectateMessage from "@/protocol/network/messages/GameFightSpectateMessage";
import FightDispellableEffectExtendedInformations from "@/protocol/network/types/FightDispellableEffectExtendedInformations";
import GameActionMark from "@/protocol/network/types/GameActionMark";
import GameFightSpellCooldown from "@/protocol/network/types/GameFightSpellCooldown";

export default class GameFightResumeMessage extends GameFightSpectateMessage {
  public spellCooldowns: GameFightSpellCooldown[];
  public summonCount: number;
  public bombCount: number;

  constructor(gameTurn = 0, summonCount = 0, bombCount = 0,
              effects: FightDispellableEffectExtendedInformations[], marks: GameActionMark[],
              spellCooldowns: GameFightSpellCooldown[]) {
    super(gameTurn, effects, marks);
    this.spellCooldowns = spellCooldowns;
    this.summonCount = summonCount;
    this.bombCount = bombCount;

  }
}
