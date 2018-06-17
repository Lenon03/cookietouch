import FightLoot from "./FightLoot";
import Type from "./Type";

export default class FightResultListEntry extends Type {

  public outcome: number;
  public rewards: FightLoot;

  constructor(outcome = 0, rewards: FightLoot) {
    super();
    this.outcome = outcome;
    this.rewards = rewards;
    this.rewards = rewards;
  }
}
