import Data from "@/protocol/data/Data";

export default class Effects extends Data {
  public descriptionId: string = "";
  public iconId: number = 0;
  public characteristic: number = 0;
  public category: number = 0;
  public operator: string = "";
  public showInTooltip: boolean = false;
  public useDice: boolean = false;
  public forceMinMax: boolean = false;
  public boost: boolean = false;
  public active: boolean = false;
  public showInSet: boolean = false;
  public bonusType: number = 0;
  public useInFight: boolean = false;
  public effectPriority: number = 0;
}
