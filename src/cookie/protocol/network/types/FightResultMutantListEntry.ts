import FightLoot from "@/protocol/network/types/FightLoot";
import FightResultFighterListEntry from "@/protocol/network/types/FightResultFighterListEntry";

export default class FightResultMutantListEntry extends FightResultFighterListEntry {

  public level: number;

  constructor(outcome = 0, rewards: FightLoot, id = 0, alive = false, level = 0) {
    super(outcome, rewards, id, alive);
    this.level = level;
  }
}
