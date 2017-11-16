export default class AdditionalTaxCollectorInformations {

  public collectorcallername: string;
  public date: number;

  constructor(collectorcallername = "", date = 0) {
    this.collectorcallername = collectorcallername;
    this.date = date;
  }
}
