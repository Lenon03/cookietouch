import Type from "./Type";

export default class AdditionalTaxCollectorInformations extends Type {

  public collectorCallerName: string;
  public date: number;

  constructor(collectorCallerName = "", date = 0) {
    super();
    this.collectorCallerName = collectorCallerName;
    this.date = date;
  }
}
