import Type from "./Type";

export default class ProtectedEntityWaitingForHelpInfo extends Type {

  public timeLeftBeforeFight: number;
  public waitTimeForPlacement: number;
  public nbPositionForDefensors: number;

  constructor(timeLeftBeforeFight = 0, waitTimeForPlacement = 0, nbPositionForDefensors = 0) {
    super();
    this.timeLeftBeforeFight = timeLeftBeforeFight;
    this.waitTimeForPlacement = waitTimeForPlacement;
    this.nbPositionForDefensors = nbPositionForDefensors;
  }
}
