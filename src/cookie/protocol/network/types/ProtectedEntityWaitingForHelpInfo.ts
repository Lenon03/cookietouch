export default class ProtectedEntityWaitingForHelpInfo {

  public timeLeftBeforeFight: number;
  public waitTimeForPlacement: number;
  public nbPositionForDefensors: number;

  constructor(timeLeftBeforeFight = 0, waitTimeForPlacement = 0, nbPositionForDefensors = 0) {
    this.timeLeftBeforeFight = timeLeftBeforeFight;
    this.waitTimeForPlacement = waitTimeForPlacement;
    this.nbPositionForDefensors = nbPositionForDefensors;
  }
}
