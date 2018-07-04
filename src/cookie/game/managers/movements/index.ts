import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import Pathfinder from "@/core/pathfinder";
import MoveNode from "@/core/pathfinder/fights/MoveNode";
import PathDuration from "@/core/pathfinder/PathDuration";
import { MapChangeDirections } from "@/game/managers/movements/MapChangeDirections";
import { MovementRequestResults } from "@/game/managers/movements/MovementRequestResults";
import MapGame from "@/game/map";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";
import { getRandomInt } from "@/utils/Random";
import { sleep } from "@/utils/Time";
import { Enumerable } from "linqts";

export default class MovementsManager implements IClearable {
  private readonly onMovementFinished = new LiteEvent<boolean>();
  private account: Account;
  private currentPath: number[] = null;
  private neighbourMapId: number = 0;
  private pathfinder: Pathfinder;
  private retries: number = 0;

  constructor(account: Account, map: MapGame) {
    this.account = account;
    this.pathfinder = new Pathfinder();
    map.MapChanged.on(() => this.pathfinder.setMap(this.account.game.map.data));
  }

  public get MovementFinished() {
    return this.onMovementFinished.expose();
  }

  public moveToCell(
    cellId: number,
    stopNextToTarget: boolean = false
  ): MovementRequestResults {
    if (cellId < 0 || cellId > 560) {
      this.account.logger.logDebug(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("invalidCellId")
      );
      return MovementRequestResults.FAILED;
    }

    if (this.account.isBusy || this.currentPath !== null) {
      this.account.logger.logDebug(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans(
          "movementBusy",
          this.account.isBusy,
          this.currentPath !== null
        )
      );
      return MovementRequestResults.FAILED;
    }

    if (this.account.game.map.playedCharacter.cellId === cellId) {
      return MovementRequestResults.ALREADY_THERE;
    }

    const path = this.pathfinder.getPath(
      this.account.game.map.playedCharacter.cellId,
      cellId,
      this.account.game.map.occupiedCells,
      true,
      stopNextToTarget
    );

    if (path.length === 0) {
      this.account.logger.logDebug(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("emptyPath")
      );
      return MovementRequestResults.FAILED;
    }

    // stopNextToTarget=false case, the path is not complete
    if (!stopNextToTarget && path[path.length - 1] !== cellId) {
      this.account.logger.logDebug(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("pathBlocked")
      );
      return MovementRequestResults.PATH_BLOCKED;
    }
    // stopNextToTarget=true case, in case we can't move anywhere near the target cell
    if (
      stopNextToTarget &&
      path.length === 1 &&
      path[0] === this.account.game.map.playedCharacter.cellId
    ) {
      this.account.logger.logDebug(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("alreadyThere")
      );
      return MovementRequestResults.ALREADY_THERE;
    }
    // stopNextToTarget=true case, the character is already next to the target
    if (
      stopNextToTarget &&
      path.length === 2 &&
      path[0] === this.account.game.map.playedCharacter.cellId &&
      path[1] === cellId
    ) {
      this.account.logger.logDebug(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("alreadyThere")
      );
      return MovementRequestResults.ALREADY_THERE;
    }

    this.currentPath = path;
    this.sendMoveMessage();
    this.retries = 0;
    return MovementRequestResults.MOVED;
  }

  public async moveToCellInFight(node: [number, MoveNode] = null) {
    if (this.account.state !== AccountStates.FIGHTING) {
      return;
    }

    if (node === null || node["1"].path.reachable.length === 0) {
      return;
    }

    if (node["0"] === this.account.game.fight.playedFighter.cellId) {
      return;
    }

    // Insert the current cellId
    node["1"].path.reachable.unshift(
      this.account.game.fight.playedFighter.cellId
    );

    await this.account.network.sendMessageFree(
      "GameMapMovementRequestMessage",
      {
        keyMovements: this.pathfinder.compressPath(node["1"].path.reachable),
        mapId: this.account.game.map.id
      }
    );
  }

  public canChangeMap(cellId: number, direction: MapChangeDirections): boolean {
    switch (direction) {
      case MapChangeDirections.Left:
        return (
          (this.account.game.map.data.cells[cellId].c & direction) > 0 &&
          cellId % 14 === 0
        );
      case MapChangeDirections.Right:
        return (
          (this.account.game.map.data.cells[cellId].c & direction) > 0 &&
          cellId % 14 === 13
        );
      case MapChangeDirections.Top:
        return (
          (this.account.game.map.data.cells[cellId].c & direction) > 0 &&
          cellId < 28
        );
      case MapChangeDirections.Bottom:
        return (
          (this.account.game.map.data.cells[cellId].c & direction) > 0 &&
          cellId > 531
        );
    }
    return false;
  }

  public changeMap(direction: MapChangeDirections): boolean {
    if (this.account.isBusy || this.neighbourMapId !== 0) {
      this.account.logger.logWarning(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans(
          "movementIsBusy",
          AccountStates[this.account.state]
        )
      );
      return false;
    }

    let changeMapCells = this.getChangeMapCells(direction);

    while (changeMapCells.length > 0) {
      const cellId = changeMapCells[getRandomInt(0, changeMapCells.length - 1)];

      // Ignore the cell if a group of monsters is on it
      if (
        this.account.game.map.monstersGroups.find(m => m.cellId === cellId) !==
        undefined
      ) {
        continue;
      }

      this.neighbourMapId = this.getNeighbourMapId(direction);

      if (this.neighbourMapId <= 0) {
        return false;
      }

      // Only return true so that if one cell fails, we try the others
      if (this.moveToChangeMap(cellId)) {
        return true;
      }

      changeMapCells = changeMapCells.filter(c => c !== cellId);
    }

    return false;
  }

  public changeMapWithCellId(
    direction: MapChangeDirections,
    cellId: number
  ): boolean {
    if (this.account.isBusy || this.neighbourMapId !== 0) {
      return false;
    }

    if (!this.canChangeMap(cellId, direction)) {
      return false;
    }

    this.neighbourMapId = this.getNeighbourMapId(direction);

    if (this.neighbourMapId <= 0) {
      this.account.logger.logWarning(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("invalidNeighbour")
      );
      return false;
    }

    return this.moveToChangeMap(cellId);
  }

  public async UpdateGameMapMovementMessage(account: Account, data: any) {
    if (
      this.currentPath &&
      data.actorId === account.game.character.id &&
      data.keyMovements[0] === this.currentPath[0] &&
      this.currentPath.includes(data.keyMovements[data.keyMovements.length - 1])
    ) {
      // TODO: Not sure if it is the best way to handle character's state,
      // and to handle map changements.
      account.state = AccountStates.MOVING;

      if (!account.config.enableSpeedHack) {
        const duration = PathDuration.calculate(this.currentPath);
        await sleep(duration);
      }

      account.network.sendMessageFree("GameMapMovementConfirmMessage");

      account.state = AccountStates.NONE;

      if (this.neighbourMapId === 0) {
        this.OnMovementFinished(true);
      } else {
        this.currentPath = null;

        if (this.neighbourMapId !== 0) {
          await account.network.sendMessageFree("ChangeMapMessage", {
            mapId: this.neighbourMapId
          });

          this.neighbourMapId = 0;
        }
      }
    }
  }

  public async UpdateGameMapNoMovementMessage(account: Account, data: any) {
    if (this.currentPath === null) {
      return;
    }

    if (!this.account.scripts.running) {
      this.clear();
      return;
    }

    this.retries++;
    if (this.retries > 3) {
      this.account.logger.logError(
        LanguageManager.trans("movementsManager"),
        LanguageManager.trans("maxMovingRetries")
      );
      return;
    }

    await sleep(5000);

    // In case one of these happen while we were waiting
    if (this.currentPath === null) {
      return;
    }

    if (!this.account.scripts.running) {
      this.clear();
      return;
    }

    this.sendMoveMessage();
  }

  public cancel() {
    return this.clear();
  }

  public clear() {
    this.currentPath = null;
    this.neighbourMapId = 0;
    this.retries = 0;
  }

  private moveToChangeMap(cellId: number): boolean {
    switch (this.moveToCell(cellId)) {
      case MovementRequestResults.MOVED:
        this.account.logger.logDebug(
          LanguageManager.trans("movementsManager"),
          LanguageManager.trans("moveToChangeMap", this.account.game.map.id)
        );
        return true;
      case MovementRequestResults.ALREADY_THERE:
        this.account.network.sendMessageFree("ChangeMapMessage", {
          mapId: this.neighbourMapId
        });
        this.neighbourMapId = 0;
        return true;
      default:
        this.account.logger.logDebug(
          LanguageManager.trans("movementsManager"),
          LanguageManager.trans("pathToCellBlocked", cellId)
        );
        this.neighbourMapId = 0;
        return false;
    }
  }

  private getChangeMapCells(direction: MapChangeDirections): number[] {
    return Enumerable.Range(0, 560)
      .Where(c => this.canChangeMap(c, direction))
      .ToArray();
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
    this.account.network.sendMessageFree("GameMapMovementRequestMessage", {
      keyMovements: this.pathfinder.compressPath(this.currentPath),
      mapId: this.account.game.map.id
    });
    const pathString = this.currentPath.join(",");
    this.account.logger.logDebug(
      LanguageManager.trans("movementsManager"),
      LanguageManager.trans("showPath", pathString)
    );
  }

  private OnMovementFinished(success: boolean) {
    this.currentPath = null;
    this.neighbourMapId = 0;
    this.onMovementFinished.trigger(success);
  }
}
