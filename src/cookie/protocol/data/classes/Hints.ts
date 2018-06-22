import Data from "@/protocol/data/Data";

export default class Hints extends Data {
  public categoryId: number;
  public gfx: number;
  public nameId: string;
  public mapId: number;
  public realMapId: number;
  public x: number;
  public y: number;
  public outdoor: boolean;
  public subareaId: number;
  public worldMapId: number;
}
