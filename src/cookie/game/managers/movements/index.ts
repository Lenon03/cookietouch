import axios from "axios";
import Account from "../../../Account";
import { AccountStates } from "../../../AccountStates";
import PathFinder from "../../../core/PathFinder";
import PathDuration from "../../../core/PathFinder/PathDuration";
import Map from "../../../protocol/data/map";
import Cell from "../../../protocol/data/map/Cell";
import LiteEvent from "../../../utils/LiteEvent";
import { MapChangeDirections } from "./MapChangeDirections";
import { MovementRequestResults } from "./MovementRequestResults";

export default class MovementsManager {

  public map: Map;

  public get MovementFinished() { return this.onMovementFinished.expose(); }
  private readonly onMovementFinished = new LiteEvent<boolean>();

  private account: Account;
  private currentPath: number[] = null;
  private neighbourMapId: number = 0;

  constructor(account: Account) {
    this.account = account;
    PathFinder.Init();
  }

  public updateMap(mapId: number): Promise<Map> {
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
        .then(() => resolve(this.map));
    });
  }

  public moveToCell(cellId: number, stopNextToTarget: boolean = false): MovementRequestResults {
    if (cellId < 0 || cellId > 560) {
      console.log("[MovementsManager] Invalid CellId.");
      return MovementRequestResults.FAILED;
    }

    if (this.account.isBusy || this.currentPath !== null) {
      console.log("[MovementsManager] IsBusy: " + this.account.isBusy + " , PathNotNull: " + this.currentPath !== null);
      return MovementRequestResults.FAILED;
    }

    if (this.account.game.character.cellId === cellId) {
      return MovementRequestResults.ALREADY_THERE;
    }

    const path = PathFinder.getPath(this.account.game.map.playedCharacter.cellId, cellId,
      this.account.game.map.occupiedCells, true, stopNextToTarget);
    console.log(PathFinder.logPath(path));

    if (path.length === 0) {
      console.log("[MovementsManager] Empty Path.");
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
    if (this.account.isBusy || this.neighbourMapId !== 0) {
      return false;
    }

    let changeMapCells = this.getChangeMapCells(direction);

    while (changeMapCells.length > 0) {
      const cellId = changeMapCells[Math.floor(Math.random() * changeMapCells.length)];

      // Ignore the cell if a group of monsters is on it
      if (this.account.game.map.monstersGroups.find((m) => m.cellId === cellId)) {
        continue;
      }

      this.neighbourMapId = this.getNeighbourMapId(direction);

      if (this.neighbourMapId === 0) {
        return false;
      }

      // Only return true so that if one cell fails, we try the others
      if (this.moveToChangeMap(cellId)) {
        return true;
      }

      changeMapCells = changeMapCells.filter((c) => c !== cellId);
    }

    return false;
  }

  public changeMapWithCellId(direction: MapChangeDirections, cellId: number): boolean {
    if (this.account.isBusy || this.neighbourMapId === 0) {
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

  public UpdateGameMapMovementMessage(account: Account, data: any) {
    if (data.actorId === account.game.character.infos.id
      && data.keyMovements[0] === this.currentPath[0]
      && this.currentPath.includes(data.keyMovements[data.keyMovements.length - 1])) {
      // TODO: Not sure if it is the best way to handle character's state,
      // and to handle map changements.
      account.state = AccountStates.MOVING;

      const duration = PathDuration.calculate(this.currentPath);
      setTimeout(() => {
        account.network.sendMessage("GameMapMovementConfirmMessage");

        account.state = AccountStates.NONE;

        if (this.neighbourMapId === 0) {
          this.OnMovementFinished(true);
        } else {
          this.currentPath = null;

          if (this.neighbourMapId !== 0) {
            account.network.sendMessage("ChangeMapMessage", {
              mapId: this.neighbourMapId,
            });

            this.neighbourMapId = 0;
          }
        }
      }, duration);
    }
  }

  public UpdateGameMapNoMovementMessage(account: Account, data: any) {
    if (this.currentPath === null) {
      return;
    }

    setTimeout(() => {
      if (this.currentPath === null) {
        return;
      }

      this.sendMoveMessage();
    }, 5000);
  }

  private moveToChangeMap(cellId: number): boolean {
    switch (this.moveToCell(cellId)) {
      case MovementRequestResults.MOVED:
        console.log(`${this.account.game.map.id} Moving to change map`);
        return true;
      case MovementRequestResults.ALREADY_THERE:
        this.account.network.sendMessage("ChangeMapMessage", {
          mapId: this.neighbourMapId,
        });
        this.neighbourMapId = 0;
        return false;
      default:
        console.log(`Path to ${cellId} failed or is blocked.`);
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
    this.account.network.sendMessage("GameMapMovementRequestMessage", {
      // keyMovements: PathFinder.compressPath(this.currentPath),
      keyMovements: this.currentPath, // NOTE: Check if we don't have to really compress the path
      mapId: this.account.game.map.id,
    });
  }

  private OnMovementFinished(success: boolean) {
    this.currentPath = null;
    this.neighbourMapId = 0;
    this.onMovementFinished.trigger(success);
  }
}
