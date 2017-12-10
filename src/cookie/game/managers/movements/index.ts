import Pathfinder from "@/core/pathfinder";
import MoveNode from "@/core/pathfinder/fights/MoveNode";
import PathDuration from "@/core/pathfinder/PathDuration";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import MapGame from "@game/map";
import Map from "@protocol/data/map";
import Cell from "@protocol/data/map/Cell";
import GraphicalElement from "@protocol/data/map/GraphicalElement";
import DTConstants from "@protocol/DTConstants";
import IClearable from "@utils/IClearable";
import LiteEvent from "@utils/LiteEvent";
import { getRandomInt } from "@utils/Random";
import { sleep } from "@utils/Time";
import axios from "axios";
import { Enumerable, List } from "linqts";
import { MapChangeDirections } from "./MapChangeDirections";
import { MovementRequestResults } from "./MovementRequestResults";

export default class MovementsManager implements IClearable {
  public get MovementFinished() { return this.onMovementFinished.expose(); }
  private readonly onMovementFinished = new LiteEvent<boolean>();

  private account: Account;
  private currentPath: number[] = null;
  private neighbourMapId: number = 0;
  private pathfinder: Pathfinder;

  constructor(account: Account, map: MapGame) {
    this.account = account;
    this.pathfinder = new Pathfinder();
    map.MapChanged.on(() => {
      this.pathfinder.setMap(this.account.game.map.data);
    });
  }

  public moveToCell(cellId: number, stopNextToTarget: boolean = false): MovementRequestResults {
    if (cellId < 0 || cellId > 560) {
      this.account.logger.logDebug("MovementsManager", "Invalid CellId.");
      return MovementRequestResults.FAILED;
    }

    if (this.account.isBusy || this.currentPath !== null) {
      this.account.logger.logDebug("MovementsManager",
      `IsBusy: ${this.account.isBusy}, PathNotNull: ${this.currentPath !== null}`);
      return MovementRequestResults.FAILED;
    }

    if (this.account.game.map.playedCharacter.cellId === cellId) {
      return MovementRequestResults.ALREADY_THERE;
    }

    const path = this.pathfinder.getPath(this.account.game.map.playedCharacter.cellId, cellId,
      this.account.game.map.occupiedCells, true, stopNextToTarget);

    if (path.length === 0) {
      this.account.logger.logDebug("MovementsManager", "Empty Path.");
      return MovementRequestResults.FAILED;
    }

    // stopNextToTarget=false case, the path is not complete
    if (!stopNextToTarget && path[path.length - 1] !== cellId) {
      this.account.logger.logDebug("MovementsManager", "Path Blocked.");
      return MovementRequestResults.PATH_BLOCKED;
    }
    // stopNextToTarget=true case, in case we can't move anywhere near the target cell
    if (stopNextToTarget && path.length === 1 && path[0] === this.account.game.map.playedCharacter.cellId) {
      this.account.logger.logDebug("MovementsManager", "Already there.");
      return MovementRequestResults.ALREADY_THERE;
    }
    // stopNextToTarget=true case, the character is already next to the target
    if (stopNextToTarget && path.length === 2
      && path[0] === this.account.game.map.playedCharacter.cellId && path[1] === cellId) {
      this.account.logger.logDebug("MovementsManager", "Already there.");
      return MovementRequestResults.ALREADY_THERE;
    }

    this.currentPath = path;
    this.sendMoveMessage();
    return MovementRequestResults.MOVED;
  }

  public async moveToCellInFight(node: { key: number, value: MoveNode } = null) {
    if (this.account.state !== AccountStates.FIGHTING) {
      return;
    }

    if (node === null || node.value.path.reachable.length === 0) {
      return;
    }

    if (node.key === this.account.game.fight.playedFighter.cellId) {
      return;
    }

    // Insert the current cellId
    node.value.path.reachable.unshift(this.account.game.fight.playedFighter.cellId);

    await this.account.network.sendMessage("GameMapMovementRequestMessage", {
      // keyMovements: this.pathfinder.compressPath(node.value.path.reachable),
      keyMovements: node.value.path.reachable, // TODO: Or the compressed one?
      mapId: this.account.game.map.id,
    });
  }

  public canChangeMap(cellId: number, direction: MapChangeDirections): boolean {
    switch (direction) {
      case MapChangeDirections.Left:
        return (this.account.game.map.data.cells[cellId].c & direction) > 0 && cellId % 14 === 0;
      case MapChangeDirections.Right:
        return (this.account.game.map.data.cells[cellId].c & direction) > 0 && cellId % 14 === 13;
      case MapChangeDirections.Top:
        return (this.account.game.map.data.cells[cellId].c & direction) > 0 && cellId < 28;
      case MapChangeDirections.Bottom:
        return (this.account.game.map.data.cells[cellId].c & direction) > 0 && cellId > 531;
    }
    return false;
  }

  public changeMap(direction: MapChangeDirections): boolean {
    if (this.account.isBusy || this.neighbourMapId !== 0) {
      this.account.logger.logWarning("MovementsManager", "Is busy or already changing map.");
      return false;
    }

    let changeMapCells = this.getChangeMapCells(direction);

    while (changeMapCells.length > 0) {
      const cellId = changeMapCells[getRandomInt(0, changeMapCells.length)];

      // Ignore the cell if a group of monsters is on it
      if (this.account.game.map.monstersGroups.find((m) => m.cellId === cellId) !== undefined) {
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

    return this.neighbourMapId !== 0 && this.moveToChangeMap(cellId);
  }

  public async UpdateGameMapMovementMessage(account: Account, data: any) {
    if (data.actorId === account.game.character.id
      && data.keyMovements[0] === this.currentPath[0]
      && this.currentPath.includes(data.keyMovements[data.keyMovements.length - 1])) {
      // TODO: Not sure if it is the best way to handle character's state,
      // and to handle map changements.
      account.state = AccountStates.MOVING;

      const duration = PathDuration.calculate(this.currentPath);

      await sleep(duration);

      account.network.sendMessage("GameMapMovementConfirmMessage");

      account.state = AccountStates.NONE;

      if (this.neighbourMapId === 0) {
        this.OnMovementFinished(true);
      } else {
        this.currentPath = null;

        if (this.neighbourMapId !== 0) {
          await account.network.sendMessage("ChangeMapMessage", {
            mapId: this.neighbourMapId,
          });

          this.neighbourMapId = 0;
        }
      }
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

  public clear() {
    this.currentPath = null;
    this.neighbourMapId = 0;
  }

  private moveToChangeMap(cellId: number): boolean {
    switch (this.moveToCell(cellId)) {
      case MovementRequestResults.MOVED:
        this.account.logger.logDebug("", `${this.account.game.map.id} Moving to change map`);
        return true;
      case MovementRequestResults.ALREADY_THERE:
        this.account.network.sendMessage("ChangeMapMessage", {
          mapId: this.neighbourMapId,
        });
        this.neighbourMapId = 0;
        return true;
      default:
        this.account.logger.logDebug("", `Path to ${cellId} failed or is blocked.`);
        this.neighbourMapId = 0;
        return false;
    }
  }

  private getChangeMapCells(direction: MapChangeDirections): number[] {
    return Enumerable.Range(0, 560).Where((c) => this.canChangeMap(c, direction)).ToArray();
  }

  private getNeighbourMapId(direction: MapChangeDirections) {
    switch (direction) {
      case MapChangeDirections.Bottom:
        return this.account.game.map.data.bottomNeighbourId;
      case MapChangeDirections.Top:
        return this.account.game.map.data.topNeighbourId;
      case MapChangeDirections.Left:
        return this.account.game.map.data.leftNeighbourId;
      case MapChangeDirections.Right:
        return this.account.game.map.data.rightNeighbourId;
      default:
        return 0;
    }
  }

  private sendMoveMessage() {
    this.account.network.sendMessage("GameMapMovementRequestMessage", {
      // keyMovements: this.pathfinder.compressPath(this.currentPath),
      keyMovements: this.currentPath, // TODO: Or the compressed one?
      mapId: this.account.game.map.id,
    });
    this.account.logger.logDebug("MovementsManager", `Path: ${new List(this.currentPath).Aggregate((c, n) => `${c},${n}`)}`);
  }

  private OnMovementFinished(success: boolean) {
    this.currentPath = null;
    this.neighbourMapId = 0;
    this.onMovementFinished.trigger(success);
  }
}
