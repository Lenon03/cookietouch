import Data from "@/protocol/data/Data";

export default class QuestStepRewards extends Data {
  public stepId: number;
  public levelMin: number;
  public levelMax: number;
  public itemsReward: number[][];
  public emotesReward: object[];
  public jobsReward: object[];
  public spellsReward: object[];
}
