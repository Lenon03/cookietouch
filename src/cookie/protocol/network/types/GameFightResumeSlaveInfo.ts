import GameFightSpellCooldown from "./GameFightSpellCooldown";
import Type from "./Type";

export default class GameFightResumeSlaveInfo extends Type {
  public spellCooldowns: GameFightSpellCooldown[];
  public slaveId: number;
  public summonCount: number;
  public bombCount: number;

  constructor(slaveId = 0, summonCount = 0, bombCount = 0, spellCooldowns: GameFightSpellCooldown[]) {
    super();
    this.spellCooldowns = spellCooldowns;
    this.slaveId = slaveId;
    this.summonCount = summonCount;
    this.bombCount = bombCount;
  }
}
