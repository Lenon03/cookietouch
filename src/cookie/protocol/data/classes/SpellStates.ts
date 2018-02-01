import Data from "../Data";

export default class SpellStates extends Data {
  public nameId: string;
  public preventsSpellCast: boolean;
  public preventsFight: boolean;
  public critical: boolean;
}
