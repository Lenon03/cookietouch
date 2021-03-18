import Data from "@/protocol/data/Data";

export default class Achievements extends Data {
  public nameId: string = "";
  public categoryId: number = 0;
  public descriptionId: string = "";
  public iconId: number = 0;
  public points: number = 0;
  public level: number = 0;
  public order: number = 0;
  public kamasRatio: number = 0;
  public experienceRatio: number = 0;
  public kamasScaleWithPlayerLevel: boolean = false;
  public objectiveIds: number[] = [];
  public rewardIds: object[] = [];
}
