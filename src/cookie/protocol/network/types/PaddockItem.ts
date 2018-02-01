import ItemDurability from "./ItemDurability";
import ObjectItemInRolePlay from "./ObjectItemInRolePlay";

export default class PaddockItem extends ObjectItemInRolePlay {
  public durability: ItemDurability;

  constructor(cellId = 0, objectGID = 0, durability: ItemDurability = null) {
    super(cellId, objectGID);
    this.durability = durability;

  }
}
