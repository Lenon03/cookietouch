import Data from "@/protocol/data/Data";

export default class Spells extends Data {
  public nameId: string = "";
  public descriptionId: string = "";
  public typeId: number = 0;
  public scriptParams: string = "";
  public scriptParamsCritical: string = "";
  public scriptId: number = 0;
  public scriptIdCritical: number = 0;
  public iconId: number = 0;
  public spellLevels: number[] = [];
}
