import Data from "@/protocol/data/Data";

export default class ActionDescriptions extends Data {
  public typeId: number = 0;
  public name: string = "";
  public trusted: boolean = false;
  public needInteraction: boolean = false;
  public maxUsePerFrame: number = 0;
  public minimalUseInterval: number = 0;
  public needConfirmation: boolean = false;
}
