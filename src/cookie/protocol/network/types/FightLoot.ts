export default class FightLoot {

  public objects: number[];
  public kamas: number;

  constructor(kamas = 0, objects: number[]) {
    this.objects = objects;
    this.kamas = kamas;
  }
}
