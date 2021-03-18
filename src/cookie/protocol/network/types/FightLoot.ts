import Type from "@/protocol/network/types/Type";

export default class FightLoot extends Type {

  public objects: number[];
  public kamas: number;

  constructor(kamas = 0, objects: number[]) {
    super();
    this.objects = objects;
    this.kamas = kamas;
  }
}
