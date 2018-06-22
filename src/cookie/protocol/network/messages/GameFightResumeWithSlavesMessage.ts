import FightDispellableEffectExtendedInformations from "@/protocol/network/types/FightDispellableEffectExtendedInformations";
import GameActionMark from "@/protocol/network/types/GameActionMark";
import GameFightResumeSlaveInfo from "@/protocol/network/types/GameFightResumeSlaveInfo";
import GameFightSpellCooldown from "@/protocol/network/types/GameFightSpellCooldown";
import GameFightResumeMessage from "@/protocol/network/messages/GameFightResumeMessage";

export default class GameFightResumeWithSlavesMessage extends GameFightResumeMessage {
  public slavesInfo: GameFightResumeSlaveInfo[];

  constructor(gameTurn = 0, summonCount = 0, bombCount = 0, effects: FightDispellableEffectExtendedInformations[],
              marks: GameActionMark[], spellCooldowns: GameFightSpellCooldown[], slavesInfo: GameFightResumeSlaveInfo[]) {
    super(gameTurn, summonCount, bombCount, effects, marks, spellCooldowns);
    this.slavesInfo = slavesInfo;

  }
}
