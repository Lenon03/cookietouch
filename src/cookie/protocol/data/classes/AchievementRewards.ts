import Data from "../Data";

export default class AchievementRewards extends Data {
  public achievementId: number;
  public levelMin: number;
  public levelMax: number;
  public itemsReward: number[];
  public itemsQuantityReward: number[];
  public emotesReward: object[];
  public spellsReward: object[];
  public titlesReward: object[];
  public ornamentsReward: object[];
}
