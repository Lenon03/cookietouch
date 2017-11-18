import GameFightFighterLightInformations from "./GameFightFighterLightInformations";
export default class GameFightFighterMonsterLightInformations extends GameFightFighterLightInformations {
  public creatureGenericId: number;
  constructor(id = 0, level = 0, breed = 0, sex = false, alive = false, creatureGenericId = 0) {
    super(id, level, breed, sex, alive);
    this.creatureGenericId = creatureGenericId;

  }
}
