export default class GameFightSpellCooldown {
  public spellId: number;
  public cooldown: number;
  constructor(spellId = 0, cooldown = 0) {

    this.spellId = spellId;
    this.cooldown = cooldown;

  }
}
