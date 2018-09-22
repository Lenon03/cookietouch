import Data from "@/protocol/data/Data";

export default class AchievementRewards extends Data {
  public achievementId: number = 0;
  public levelMin: number = 0;
  public levelMax: number = 0;
  public itemsReward: number[] = [];
  public itemsQuantityReward: number[] = [];
  public emotesReward: object[] = [];
  public spellsReward: object[] = [];
  public titlesReward: object[] = [];
  public ornamentsReward: object[] = [];
}
