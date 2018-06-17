import GameFightFighterLightInformations from "./GameFightFighterLightInformations";

export default class GameFightFighterNamedLightInformations extends GameFightFighterLightInformations {
  public name: string;

  constructor(id = 0, level = 0, breed = 0, sex = false, alive = false, name = "") {
    super(id, level, breed, sex, alive);
    this.name = name;

  }
}
