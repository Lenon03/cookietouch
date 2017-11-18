import FightLoot from "./FightLoot";
import FightResultListEntry from "./FightResultListEntry";

export default class FightResultFighterListEntry extends FightResultListEntry {

  public id: number;
  public alive: boolean;

  constructor(outcome = 0, rewards: FightLoot, id = 0, alive = false) {
    super(outcome, rewards);
    this.id = id;
    this.alive = alive;
  }
}
