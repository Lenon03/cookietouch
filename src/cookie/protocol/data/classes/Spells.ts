import Data from "../Data";

export default class Spells extends Data {
  public nameId: string;
  public descriptionId: string;
  public typeId: number;
  public scriptParams: string;
  public scriptParamsCritical: string;
  public scriptId: number;
  public scriptIdCritical: number;
  public iconId: number;
  public spellLevels: number[];
}
