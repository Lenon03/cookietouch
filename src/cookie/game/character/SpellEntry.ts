import DataManager from "../../protocol/data";
import DataClasses from "../../protocol/data/classes";
import Spells from "../../protocol/data/classes/Spells";
import DTConstants from "../../protocol/DTConstants";
import SpellItem from "../../protocol/network/types/SpellItem";

export default class SpellEntry {
  public id: number;
  public level: number;
  public name: string;
  public minPlayerLevel: number;

  get iconUrl() {
    return `${DTConstants.config.assetsUrl}/gfx/spells/sort_${this.id}.png`;
  }

  constructor(s: SpellItem, spell: Spells) {
    this.id = s.spellId;
    this.level = s.spellLevel;
    this.name = spell.nameId;
    this.setMinPlayerLevel(spell);
  }

  public UpdateSpellUpgradeSuccessMessage(message: any) {
    this.level = message.spellLevel;
  }

  private async setMinPlayerLevel(spell: Spells) {
    const spellLevel = await DataManager.get(DataClasses.SpellLevels, spell.spellLevels[this.level - 1]);
    this.minPlayerLevel = spellLevel[0].object.minPlayerLevel;
  }
}
