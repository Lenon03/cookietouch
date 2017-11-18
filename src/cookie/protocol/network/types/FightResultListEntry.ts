import FightLoot from "./FightLoot";

export default class FightResultListEntry {

  public outcome: number;
  public rewards: FightLoot;

  constructor(outcome = 0, rewards: FightLoot) {
    this.outcome = outcome;
    this.rewards = rewards;
    this.rewards = rewards;
  }
}
