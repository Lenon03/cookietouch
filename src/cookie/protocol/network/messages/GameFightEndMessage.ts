import FightResultListEntry from "@protocol/network/types/FightResultListEntry";
import Message from "./Message";

export default class GameFightEndMessage extends Message {
  public results: FightResultListEntry[];
  public duration: number;
  public ageBonus: number;
  public lootShareLimitMalus: number;

  constructor(duration = 0, ageBonus = 0, lootShareLimitMalus = 0, results: FightResultListEntry[]) {
    super();
    this.results = results;
    this.duration = duration;
    this.ageBonus = ageBonus;
    this.lootShareLimitMalus = lootShareLimitMalus;

  }
}
