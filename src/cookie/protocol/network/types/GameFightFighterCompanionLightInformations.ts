import GameFightFighterLightInformations from "./GameFightFighterLightInformations";

export default class GameFightFighterCompanionLightInformations extends GameFightFighterLightInformations {
  public companionId: number;
  public masterId: number;

  constructor(id = 0, level = 0, breed = 0, sex = false, alive = false, companionId = 0, masterId = 0) {
    super(id, level, breed, sex, alive);
    this.companionId = companionId;
    this.masterId = masterId;

  }
}
