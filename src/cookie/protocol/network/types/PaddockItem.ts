import ItemDurability from "@/protocol/network/types/ItemDurability";
import ObjectItemInRolePlay from "@/protocol/network/types/ObjectItemInRolePlay";

export default class PaddockItem extends ObjectItemInRolePlay {
  public durability: ItemDurability;

  constructor(cellId = 0, objectGID = 0, durability = new ItemDurability()) {
    super(cellId, objectGID);
    this.durability = durability;
  }
}
