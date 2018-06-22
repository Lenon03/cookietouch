import Item from "@/protocol/network/types/Item";

export default class SpellItem extends Item {
  public position: number;
  public spellId: number;
  public spellLevel: number;
}
