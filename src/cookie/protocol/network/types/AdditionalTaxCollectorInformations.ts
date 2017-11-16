export default class AdditionalTaxCollectorInformations {

  public collectorCallerName: string;
  public date: number;

  constructor(collectorCallerName = "", date = 0) {
    this.collectorCallerName = collectorCallerName;
    this.date = date;
  }
}
