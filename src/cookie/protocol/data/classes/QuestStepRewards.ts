import Data from "@/protocol/data/Data";

export default class QuestStepRewards extends Data {
  public stepId: number = 0;
  public levelMin: number = 0;
  public levelMax: number = 0;
  public itemsReward: number[][] = [];
  public emotesReward: object[] = [];
  public jobsReward: object[] = [];
  public spellsReward: object[] = [];
}
