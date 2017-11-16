export default class ProtectedEntityWaitingForHelpInfo {

  public timeleftbeforefight: number;
  public waittimeforplacement: number;
  public nbpositionfordefensors: number;

  constructor(timeleftbeforefight = 0, waittimeforplacement = 0, nbpositionfordefensors = 0) {
    this.timeleftbeforefight = timeleftbeforefight;
    this.waittimeforplacement = waittimeforplacement;
    this.nbpositionfordefensors = nbpositionfordefensors;
  }
}
