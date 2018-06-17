import SpellLevels from "@/protocol/data/classes/SpellLevels";
import { DataTypes } from "@/protocol/data/DataTypes";
import DataManager from "@protocol/data";
import Spells from "@protocol/data/classes/Spells";
import DTConstants from "@protocol/DTConstants";
import SpellItem from "@protocol/network/types/SpellItem";

export default class SpellEntry {
  public id: number;
  public level: number;
  public name: string;
  public minPlayerLevel: number;

  constructor(s: SpellItem | number, spell: Spells | number) {
    if (typeof s === "number" && typeof spell === "number") {
      DataManager.get<Spells>(DataTypes.Spells, s).then(data => {
        const o = data[0].object;
        this.id = o.id;
        this.level = spell;
        this.name = o.nameId;
        this.setMinPlayerLevel(o);
      });
    } else if (
      typeof s === "object" /* SpellItem */ &&
      typeof spell === "object" /* Spells */
    ) {
      this.id = s.spellId;
      this.level = s.spellLevel;
      this.name = spell.nameId;
      this.setMinPlayerLevel(spell);
    }
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
