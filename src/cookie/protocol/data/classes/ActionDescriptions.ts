import Data from "../Data";

export default class ActionDescriptions extends Data {
  public typeId: number;
  public name: string;
  public trusted: boolean;
  public needInteraction: boolean;
  public maxUsePerFrame: number;
  public minimalUseInterval: number;
  public needConfirmation: boolean;
}
