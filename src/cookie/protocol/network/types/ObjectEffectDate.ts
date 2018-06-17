import ObjectEffect from "./ObjectEffect";

export default class ObjectEffectDate extends ObjectEffect {

  public year: number;
  public month: number;
  public day: number;
  public hour: number;
  public minute: number;

  constructor(actionid = 0, year = 0, month = 0, day = 0, hour = 0, minute = 0) {
    super(actionid);
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
  }
}
