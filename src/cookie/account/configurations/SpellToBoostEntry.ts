export interface ISpellToBoostEntry {
  id: number;
  name: string;
  level: number;
}

export default class SpellToBoostEntry implements ISpellToBoostEntry {
  public id: number;
  public name: string;
  public level: number;

  constructor(spellId: number, name: string, level: number) {
    this.id = spellId;
    this.name = name;
    this.level = level;
  }

  public toJSON(): ISpellToBoostEntry {
    return Object.assign({}, this, {});
  }

  public static fromJSON(json: ISpellToBoostEntry | string): SpellToBoostEntry {
    if (typeof json === "string") {
      return JSON.parse(json, SpellToBoostEntry.reviver);
    } else {
      const spell = Object.create(SpellToBoostEntry.prototype);
      // tslint:disable-next-line:prefer-object-spread
      return Object.assign(spell, json, {});
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? SpellToBoostEntry.fromJSON(value) : value;
  }
}
