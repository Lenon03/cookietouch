import DataManager from "@/protocol/data";
import SpellLevels from "@/protocol/data/classes/SpellLevels";
import Spells from "@/protocol/data/classes/Spells";
import { DataTypes } from "@/protocol/data/DataTypes";
import DTConstants from "@/protocol/DTConstants";
import SpellItem from "@/protocol/network/types/SpellItem";

export default class SpellEntry {
  public id: number = 0;
  public level: number = 0;
  public name: string = "";
  public minPlayerLevel: number = 0;

  public static async setup(
    s: SpellItem | number,
    spell: Spells | number
  ): Promise<SpellEntry> {
    const spellEntry = new SpellEntry();
    if (typeof s === "number" && typeof spell === "number") {
      const data = await DataManager.get<Spells>(DataTypes.Spells, s);
      const o = data[0].object;
      spellEntry.id = o.id;
      spellEntry.level = spell;
      spellEntry.name = o.nameId;
      spellEntry.setMinPlayerLevel(o);
    } else if (
      typeof s === "object" /* SpellItem */ &&
      typeof spell === "object" /* Spells */
    ) {
      spellEntry.id = s.spellId;
      spellEntry.level = s.spellLevel;
      spellEntry.name = spell.nameId;
      spellEntry.setMinPlayerLevel(spell);
    }
    return spellEntry;
  }

  get iconUrl() {
    return `${DTConstants.config.assetsUrl}/gfx/spells/sort_${this.id}.png`;
  }

  public UpdateSpellUpgradeSuccessMessage(message: any) {
    this.level = message.spellLevel;
  }

  private async setMinPlayerLevel(spell: Spells) {
    const spellLevel = await DataManager.get<SpellLevels>(
      DataTypes.SpellLevels,
      spell.spellLevels[this.level - 1]
    );
    this.minPlayerLevel = spellLevel[0].object.minPlayerLevel;
  }
}
