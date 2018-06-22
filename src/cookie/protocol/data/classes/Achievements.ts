import Data from "@/protocol/data/Data";

export default class Achievements extends Data {
  public nameId: string;
  public categoryId: number;
  public descriptionId: string;
  public iconId: number;
  public points: number;
  public level: number;
  public order: number;
  public kamasRatio: number;
  public experienceRatio: number;
  public kamasScaleWithPlayerLevel: boolean;
  public objectiveIds: number[];
  public rewardIds: object[];
}
