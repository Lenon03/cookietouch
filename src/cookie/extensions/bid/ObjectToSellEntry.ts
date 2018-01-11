export default class ObjectToSellEntry {
  public name: string;
  public gid: number;
  public lot: number;
  public quantity: number;
  public minPrice: number;
  public basePrice: number;

  constructor(name: string, gid: number, lot: number, quantity: number, minPrice: number, basePrice: number) {
    this.name = name;
    this.gid = gid;
    this.lot = lot;
    this.quantity = quantity;
    this.minPrice = minPrice;
    this.basePrice = basePrice;
  }
}
