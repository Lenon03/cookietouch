import ObjectEffect from "./ObjectEffect";

export default class ObjectEffectDuration extends ObjectEffect {

  public days: number;
  public hours: number;
  public minutes: number;

  constructor(actionid = 0, days = 0, hours = 0, minutes = 0) {
    super(actionid);
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
  }
}
