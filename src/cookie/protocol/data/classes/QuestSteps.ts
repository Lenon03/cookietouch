import Data from "../Data";

export default class QuestSteps extends Data {
    public questId: number;
    public nameId: string;
    public descriptionId: string;
    public dialogId: number;
    public optimalLevel: number;
    public duration: number;
    public kamasScaleWithPlayerLevel: boolean;
    public kamasRatio: number;
    public xpRatio: number;
    public objectiveIds: number[];
    public rewardsIds: number[];
}
