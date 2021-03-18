import Data from "@/protocol/data/Data";

export default class AchievementCategories extends Data {
  public nameId: string = "";
  public parentId: number = 0;
  public icon: string = "";
  public order: number = 0;
  public color: string = "";
  public achievementIds: number[] = [];
}
