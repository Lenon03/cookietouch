import GameFightFighterLightInformations from "./GameFightFighterLightInformations";

export default class GameFightFighterTaxCollectorLightInformations extends GameFightFighterLightInformations {
  public firstNameId: number;
  public lastNameId: number;

  constructor(id = 0, level = 0, breed = 0, sex = false, alive = false, firstNameId = 0, lastNameId = 0) {
    super(id, level, breed, sex, alive);
    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;

  }
}
