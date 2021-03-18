import Data from "@/protocol/data/Data";

export default class WorldMaps extends Data {
  public origineX: number = 0;
  public origineY: number = 0;
  public mapWidth: number = 0;
  public mapHeight: number = 0;
  public horizontalChunck: number = 0;
  public verticalChunck: number = 0;
  public viewableEverywhere: boolean = false;
  public minScale: number = 0;
  public maxScale: number = 0;
  public startScale: number = 0;
  public centerX: number = 0;
  public centerY: number = 0;
  public totalWidth: number = 0;
  public totalHeight: number = 0;
  public zoom: string[] = [];
}
