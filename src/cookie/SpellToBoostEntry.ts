export default class SpellToBoostEntry {
  public id: number;
  public name: string;
  public level: number;

  constructor(spellId: number, name: string, level: number) {
    this.id = spellId;
    this.name = name;
    this.level = level;
  }
}
