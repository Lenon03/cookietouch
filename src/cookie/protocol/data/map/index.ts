import Dictionary from "@utils/Dictionary";
import { AtlasLayout } from "./AtlasLayout";
import Cell from "./Cell";
import GraphicalElement from "./GraphicalElement";

export default class Map {

  public id: number;
  public topNeighbourId: number;
  public bottomNeighbourId: number;
  public leftNeighbourId: number;
  public rightNeighbourId: number;
  public shadowBonusOnEntities: number;
  public cells: Cell[] = [];
  public midgroundLayer = new Dictionary<number, GraphicalElement[]>();
  public atlasLayout = new AtlasLayout();

  constructor(id: number, topNeighbourId: number, bottomNeighbourId: number,
              leftNeighbourId: number, rightNeighbourId: number) {
    this.id = id;
    this.topNeighbourId = topNeighbourId;
    this.bottomNeighbourId = bottomNeighbourId;
    this.leftNeighbourId = leftNeighbourId;
    this.rightNeighbourId = rightNeighbourId;
  }
}
