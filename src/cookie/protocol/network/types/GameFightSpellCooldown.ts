import Type from "@/protocol/network/types/Type";

export default class GameFightSpellCooldown extends Type {
  public spellId: number;
  public cooldown: number;

  constructor(spellId = 0, cooldown = 0) {
    super();
    this.spellId = spellId;
    this.cooldown = cooldown;
  }
}
