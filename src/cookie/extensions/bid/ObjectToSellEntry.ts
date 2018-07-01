export interface IObjectToSellEntry {
  name: string;
  gid: number;
  lot: number;
  quantity: number;
  minPrice: number;
  basePrice: number;
}

export default class ObjectToSellEntry implements IObjectToSellEntry {
  public name: string;
  public gid: number;
  public lot: number;
  public quantity: number;
  public minPrice: number;
  public basePrice: number;

  constructor(
    name: string,
    gid: number,
    lot: number,
    quantity: number,
    minPrice: number,
    basePrice: number
  ) {
    this.name = name;
    this.gid = gid;
    this.lot = lot;
    this.quantity = quantity;
    this.minPrice = minPrice;
    this.basePrice = basePrice;
  }

  public toJSON(): IObjectToSellEntry {
    return Object.assign({}, this, {});
  }

  public static fromJSON(json: IObjectToSellEntry | string): ObjectToSellEntry {
    if (typeof json === "string") {
      return JSON.parse(json, ObjectToSellEntry.reviver);
    } else {
      const accountConfiguration = Object.create(ObjectToSellEntry.prototype);
      return {
        ...accountConfiguration,
        ...json
      };
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? ObjectToSellEntry.fromJSON(value) : value;
  }
}
