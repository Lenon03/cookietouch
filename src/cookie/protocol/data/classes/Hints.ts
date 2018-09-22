import Data from "@/protocol/data/Data";

export default class Hints extends Data {
  public categoryId: number = 0;
  public gfx: number = 0;
  public nameId: string = "";
  public mapId: number = 0;
  public realMapId: number = 0;
  public x: number = 0;
  public y: number = 0;
  public outdoor: boolean = false;
  public subareaId: number = 0;
  public worldMapId: number = 0;
}
