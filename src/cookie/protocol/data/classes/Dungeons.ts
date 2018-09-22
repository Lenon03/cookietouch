import Data from "@/protocol/data/Data";

export default class Dungeons extends Data {
  public nameId: string = "";
  public optimalPlayerLevel: number = 0;
  public mapIds: number[] = [];
  public entranceMapId: number = 0;
  public exitMapId: number = 0;
}
