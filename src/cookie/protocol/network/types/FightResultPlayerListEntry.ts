import FightLoot from "./FightLoot";
import FightResultAdditionalData from "./FightResultAdditionalData";
import FightResultFighterListEntry from "./FightResultFighterListEntry";

export default class FightResultPlayerListEntry extends FightResultFighterListEntry {

  public additional: FightResultAdditionalData[];
  public level: number;

  constructor(outcome = 0, rewards: FightLoot, id = 0, alive = false,
              level = 0, additional: FightResultAdditionalData[]) {
    super(outcome, rewards, id, alive);
    this.additional = additional;
    this.level = level;
  }
}
