import Data from "@/protocol/data/Data";

export default class SpellStates extends Data {
  public nameId: string = "";
  public preventsSpellCast: boolean = false;
  public preventsFight: boolean = false;
  public critical: boolean = false;
}
