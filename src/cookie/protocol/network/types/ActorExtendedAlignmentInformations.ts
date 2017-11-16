export default class ActorExtendedAlignmentInformations {

  public honor: number;
  public honorgradefloor: number;
  public honornextgradefloor: number;
  public aggressable: number;

  constructor(alignmentside = 0, alignmentvalue = 0, alignmentgrade = 0, characterpower = 0,
              honor = 0, honorgradefloor = 0, honornextgradefloor = 0, aggressable = 0 ) {
    this.honor = honor;
    this.honorgradefloor = honorgradefloor;
    this.honornextgradefloor = honornextgradefloor;
    this.aggressable = aggressable;
  }
}
