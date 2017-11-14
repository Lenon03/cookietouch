import axios from "axios";
import PathFinder from "../../dofus/PathFinder";
import Map from "../../dofus/PathFinder/Map";
import Account from "../../game/Account";
import { MapChangeDirections } from "./MapChangeDirections";
import { MovementRequestResults } from "./MovementRequestResults";

export default class MovementsManager {

  private account: Account;
  private map: Map;

  constructor(account: Account) {
    this.account = account;
    PathFinder.Init();
  }

  public updateMap(mapId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get(this.account.haapi.config.assetsUrl + "/maps/" + mapId + ".json")

        .then((response) => this.map = response.data)
        .then(() => PathFinder.fillPathGrid(this.map))
        .then(() => resolve());
    });
  }

  public moveToCellId(cellId: number): void {
    if (this.account.character.cellId === cellId) { return; }

    const path = PathFinder.getPath(this.account.character.cellId, cellId);
    console.log(PathFinder.logPath(path));

    this.account.client.sendMessage("GameMapMovementRequestMessage", {
      // keyMovements: PathFinder.compressPath(path),
      keyMovements: path, // NOTE: Check if we don't have to really compress the path
      mapId: this.account.character.map.mapId,
    });

    this.confirmMove(path);
  }

  public confirmMove(path: number[]): void {
    setTimeout(() => {
      this.account.client.sendMessage("GameMapMovementConfirmMessage");
    }, 250 * path.length);
  }

  public canChangeMap(cellId: number, direction: MapChangeDirections): boolean {
    switch (direction) {
      case MapChangeDirections.Left:
        return (this.map.cells[cellId].c & direction) > 0 && cellId % 14 === 0;
      case MapChangeDirections.Right:
        return (this.map.cells[cellId].c & direction) > 0 && cellId % 14 === 13;
      case MapChangeDirections.Top:
        return (this.map.cells[cellId].c & direction) > 0 && cellId < 28;
      case MapChangeDirections.Bottom:
        return (this.map.cells[cellId].c & direction) > 0 && cellId > 531;
    }
  }

  public changeMap(direction: MapChangeDirections): boolean {
    return false;
  }

  public changeMapWithCellId(direction: MapChangeDirections, cellId: number): boolean {
    return false;
  }
}
