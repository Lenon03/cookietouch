import Data from "../Data";

export default class Effects extends Data {
  public descriptionId: string;
  public iconId: number;
  public characteristic: number;
  public category: number;
  public operator: string;
  public showInTooltip: boolean;
  public useDice: boolean;
  public forceMinMax: boolean;
  public boost: boolean;
  public active: boolean;
  public showInSet: boolean;
  public bonusType: number;
  public useInFight: boolean;
  public effectPriority: number;
}
