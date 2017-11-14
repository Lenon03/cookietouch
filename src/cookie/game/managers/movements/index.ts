import axios from "axios";
import Account from "../../../Account";
import PathFinder from "../../../core/PathFinder";
import Cell from "../../../core/PathFinder/Cell";
import Map from "../../../core/PathFinder/Map";
import { MapChangeDirections } from "./MapChangeDirections";
import { MovementRequestResults } from "./MovementRequestResults";

export default class MovementsManager {

  public map: Map;

  private account: Account;
  private currentPath: number[] = null;
  private neighbourMapId: number = 0;

  constructor(account: Account) {
    this.account = account;
    PathFinder.Init();
  }

  public updateMap(mapId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get(this.account.haapi.config.assetsUrl + "/maps/" + mapId + ".json")

        .then((response) => {
          const data = response.data;
          const map = new Map(data.id, data.topNeighbourId,
            data.bottomNeighbourId, data.leftNeighbourId, data.rightNeighbourId);
          for (const cell of data.cells) {
            map.cells.push(new Cell(cell.l, cell.f, cell.c, cell.s, cell.z));
          }
          this.map = map;
        })
        .then(() => PathFinder.fillPathGrid(this.map))
        .then(() => resolve());
    });
  }

  public moveToCell(cellId: number, stopNextToTarget: boolean = false): MovementRequestResults {
    if (cellId < 0 || cellId > 560) {
      return MovementRequestResults.FAILED;
    }

    if (this.account.game.character.isBusy() || this.currentPath !== null) {
      return MovementRequestResults.FAILED;
    }

    if (this.account.game.character.cellId === cellId) {
      return MovementRequestResults.ALREADY_THERE;
    }

    const path = PathFinder.getPath(this.account.game.character.cellId, cellId);
    console.log(PathFinder.logPath(path));

    if (path.length === 0) {
      return MovementRequestResults.FAILED;
    }

    if (!stopNextToTarget && path[path.length - 1] !== cellId) {
      return MovementRequestResults.PATH_BLOCKED;
    }

    if (stopNextToTarget && path.length === 1 && path[0] === this.account.game.character.cellId) {
      return MovementRequestResults.ALREADY_THERE;
    }

    if (stopNextToTarget && path.length === 2 && path[0] === this.account.game.character.cellId && path[1] === cellId) {
      return MovementRequestResults.ALREADY_THERE;
    }

    this.currentPath = path;
    this.sendMoveMessage();
    return MovementRequestResults.MOVED;
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
    if (this.account.game.character.isBusy() || this.neighbourMapId !== 0) {
      return false;
    }

    let changeMapCells = this.getChangeMapCells(direction);

    while (changeMapCells.length > 0) {
      const cellId = changeMapCells[Math.floor(Math.random() * changeMapCells.length)];

      // TODO: Check here if there is a monster in this cell, if yes, skip it.

      this.neighbourMapId = this.getNeighbourMapId(direction);

      if (this.neighbourMapId === 0) {
        return false;
      }

      if (this.moveToChangeMap(cellId)) {
        return true;
      }

      changeMapCells = changeMapCells.filter((c) => c !== cellId);
    }

    return false;
  }

  public changeMapWithCellId(direction: MapChangeDirections, cellId: number): boolean {
    if (this.account.game.character.isBusy() || this.neighbourMapId === 0) {
      return false;
    }

    if (!this.canChangeMap(cellId, direction)) {
      return false;
    }

    this.neighbourMapId = this.getNeighbourMapId(direction);

    if (this.neighbourMapId === 0) {
      return false;
    }

    return this.moveToChangeMap(cellId);
  }

  private moveToChangeMap(cellId: number): boolean {
    switch (this.moveToCell(cellId)) {
      case MovementRequestResults.MOVED:
        return true;
      case MovementRequestResults.ALREADY_THERE:
        return false;
      default:
        this.neighbourMapId = 0;
        return false;
    }
  }

  private getChangeMapCells(direction: MapChangeDirections): number[] {
    let cells: number[] = [];
    for (let i = 0; i < 560; i++) {
      cells.push(i);
    }
    cells = cells.filter((c) => this.canChangeMap(c, direction));
    return cells;
  }

  private getNeighbourMapId(direction: MapChangeDirections) {
    switch (direction) {
      case MapChangeDirections.Bottom:
        return this.map.bottomNeighbourId;
      case MapChangeDirections.Top:
        return this.map.topNeighbourId;
      case MapChangeDirections.Left:
        return this.map.leftNeighbourId;
      case MapChangeDirections.Right:
        return this.map.rightNeighbourId;
      default:
        return 0;
    }
  }

  private sendMoveMessage() {
    this.account.client.sendMessage("GameMapMovementRequestMessage", {
      // keyMovements: PathFinder.compressPath(this.currentPath),
      keyMovements: this.currentPath, // NOTE: Check if we don't have to really compress the path
      mapId: this.account.game.map.mapId,
    });

    this.confirmMove(this.currentPath);
  }

  private confirmMove(path: number[]): void {
    setTimeout(() => {
      this.account.client.sendMessage("GameMapMovementConfirmMessage");
    }, 250 * path.length);
  }
}
