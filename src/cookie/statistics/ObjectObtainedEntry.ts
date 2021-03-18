export default class ObjectObtainedEntry {
  public percentage: number;
  public quantity: number;
  public gid: number;
  public name: string;

  constructor(gid: number, name: string, qty: number) {
    this.gid = gid;
    this.name = name;
    this.quantity = qty;
    this.percentage = -1;
  }
}
