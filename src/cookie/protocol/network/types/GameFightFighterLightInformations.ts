import Type from "@/protocol/network/types/Type";

export default class GameFightFighterLightInformations extends Type {
  public id: number;
  public level: number;
  public breed: number;
  public sex: boolean;
  public alive: boolean;

  constructor(id = 0, level = 0, breed = 0, sex = false, alive = false) {
    super();
    this.id = id;
    this.level = level;
    this.breed = breed;
    this.sex = sex;
    this.alive = alive;
  }
}
