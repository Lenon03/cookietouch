import Data from "../Data";

export default class AchievementCategories extends Data {
  public nameId: string;
  public parentId: number;
  public icon: string;
  public order: number;
  public color: string;
  public achievementIds: number[];
}
