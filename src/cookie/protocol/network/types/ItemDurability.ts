import Type from "./Type";

export default class ItemDurability extends Type {
  public durability: number;
  public durabilityMax: number;

  constructor(durability = 0, durabilityMax = 0) {
    super();
    this.durability = durability;
    this.durabilityMax = durabilityMax;
  }
}
