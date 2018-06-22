import Data from "@/protocol/data/Data";

export default class ItemSets extends Data {
  public _type: string;
  public items: number[];
  public nameId: string;
  public bonusIsSecret: boolean;
  public effects: any[][];
}
