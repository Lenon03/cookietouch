import Data from "@/protocol/data/Data";

export default class QuestSteps extends Data {
  public questId: number = 0;
  public nameId: string = "";
  public descriptionId: string = "";
  public dialogId: number = 0;
  public optimalLevel: number = 0;
  public duration: number = 0;
  public kamasScaleWithPlayerLevel: boolean = false;
  public kamasRatio: number = 0;
  public xpRatio: number = 0;
  public objectiveIds: number[] = [];
  public rewardsIds: number[] = [];
}
