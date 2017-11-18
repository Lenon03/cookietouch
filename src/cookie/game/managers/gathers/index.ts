import PathFinder from "@/core/pathfinder";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { MovementRequestResults } from "@game/managers/movements/MovementRequestResults";
import MapGame from "@game/map";
import InteractiveElementEntry from "@game/map/interactives/InteractiveElementEntry";
import Dictionary from "@utils/Dictionary";
import IClearable from "@utils/IClearable";
import LiteEvent from "@utils/LiteEvent";
import MovementsManager from "../movements";

export enum GatherResults {
  GATHERED,
  FAILED,
  STOLEN,
  BLACKLISTED,
  TIMED_OUT,
}
export default class GathersManager implements IClearable {
  private account: Account;
  private blacklistedElements: number[];
  private elementToGather: InteractiveElementEntry;
  private movementFinished: boolean;
  private sentUse: boolean;
  private stolen: boolean;
  private timeoutTimer: NodeJS.Timer;

  public get GatherFinished() { return this.onGatherFinished.expose(); }
  public get GatherStarted() { return this.onGatherStarted.expose(); }
  private readonly onGatherStarted = new LiteEvent<void>();
  private readonly onGatherFinished = new LiteEvent<GatherResults>();

  constructor(account: Account, movements: MovementsManager, map: MapGame) {
    this.account = account;
    this.blacklistedElements = [];
    movements.MovementFinished.on((success) => this.onMovementFinished.bind(this));
    map.MapChanged.on(() => this.mapChanged.bind(this));
    this.account.dispatcher.register("InteractiveUsedMessage",
      this.HandleInteractiveUsedMessage, this);
    this.account.dispatcher.register("InteractiveUseEndedMessage",
      this.HandleInteractiveUseEndedMessage, this);
    this.account.dispatcher.register("InteractiveUseErrorMessage",
      this.HandleInteractiveUseErrorMessage, this);
  }

  public clear() {
    this.elementToGather = null;
    this.blacklistedElements = [];
    this.stolen = false;
    this.movementFinished = false;
    this.sentUse = false;
  }

  public canGather(...resourcesIds: number[]): boolean {
    return this.getUsableElements(...resourcesIds).count() > 0;
  }

  public cancelGather() {
    this.elementToGather = null;
    global.clearInterval(this.timeoutTimer);
  }

  public gather(...resourcesIds: number[]): boolean {
    if (this.account.isBusy || this.elementToGather !== null) {
      this.account.logger.logWarning("GathersManager", "Personnage occupé ou déjà en train de recolter");
      return false;
    }

    for (const kvp of this.getUsableElements(...resourcesIds)) {
      if (this.moveToElement(kvp)) {
        return true;
      }

      this.account.logger.logWarning("GathersManager", "Pas de ressources à récolter ici.");
      return false;
    }
  }

  private getUsableElements(...resourcesIds: number[]): Dictionary<number, InteractiveElementEntry> {
    const usableElements = new Dictionary<number, InteractiveElementEntry>();
    const hasFishingRod = this.account.game.character.inventory.hasFishingRod;
    const weaponRange = this.account.game.character.inventory.weaponRange;

    for (const interactive of this.account.game.map.interactives) {
      // The element must be usable
      if (!interactive.usable) {
        continue;
      }
      // Check if the element is blacklisted
      if (this.blacklistedElements.includes(interactive.elementTypeId)) {
        continue;
      }

      // Check if this interactive is something we want
      if (!resourcesIds.includes(interactive.elementTypeId)) {
        continue;
      }

      const statedElement = this.account.game.map.getStatedElement(interactive.id);
      const elem = PathFinder.getMapPoint(statedElement.cellId);

      const path = PathFinder.getPath(this.account.game.map.playedCharacter.cellId,
        statedElement.cellId, this.account.game.map.occupiedCells, true, true);

      // If the path if invalid.
      if (path.length === 0) {
        continue;
      }

      // Check the distance between where we will be and the element we're interested in
      // If we have a fishing rod, we need to compare if with the rod's range,
      // otherwise we'll compare it to 1
      const lastCell = PathFinder.getMapPoint(path[path.length - 1]);
      const distToCell = Math.abs(lastCell.x - elem.x) - Math.abs(lastCell.y - elem.y);
      const distTo = Math.round(Math.sqrt(Math.pow(elem.x - lastCell.x, 2) + Math.pow(elem.y - lastCell.y, 2)));
      if (hasFishingRod && distToCell <= weaponRange || !hasFishingRod && distTo === 1) {
        usableElements.add(statedElement.cellId, interactive);
      }
    }

    return usableElements;
  }

  private moveToElement(element: { key: number, value: InteractiveElementEntry }): boolean {
    this.elementToGather = element.value;

    // Assuming there is no way statedElem will be null
    switch (this.account.game.managers.movements.moveToCell(element.key, true)) {
      case MovementRequestResults.MOVED: {
        return true;
      }
      case MovementRequestResults.ALREADY_THERE: {
        this.tryUsingElementToGather();
        return true;
      }
      default: {
        this.cancelGather();
        return false;
      }
    }
  }

  private tryUsingElementToGather() {
    if (this.stolen) {
      this.account.logger.logInfo("", "Ressource volé.");
      this.isGatherFinished(GatherResults.STOLEN);
    } else {
      this.account.network.sendMessage("InteractiveUseRequestMessage", {
        elemId: this.elementToGather.id,
        skillInstanceUid: this.elementToGather.enabledSkills[0].instanceUid,
      });
      this.sentUse = true;
      this.timeoutTimer = global.setTimeout(this.timeoutTimerCallback.bind(this), 20000);
    }
  }

  private timeoutTimerCallback() {
    if (this.elementToGather === null || !this.sentUse) {
      return;
    }

    this.account.logger.logWarning("GathersManager", "Timeout");
    this.isGatherFinished(GatherResults.TIMED_OUT);
  }

  private mapChanged() {
    this.blacklistedElements = [];
  }

  private isGatherFinished(result: GatherResults) {
    this.stolen = false;
    this.movementFinished = false;
    this.sentUse = false;
    this.elementToGather = null;
    this.onGatherFinished.trigger(result);
  }

  private onMovementFinished(success: boolean) {
    if (this.elementToGather === null) {
      return;
    }

    if (success) {
      this.movementFinished = true;
      this.tryUsingElementToGather();
    } else {
      this.isGatherFinished(GatherResults.FAILED);
    }
  }

  private async HandleInteractiveUsedMessage(account: Account, message: any) {
    if (this.elementToGather === null || this.elementToGather.id !== message.elemId) {
      return;
    }
    global.clearInterval(this.timeoutTimer);
    // Check if the element has been STOLEN
    if (message.entityId !== this.account.game.character.id) {
      // If our movement is already done
      if (this.movementFinished || this.sentUse) {
        this.isGatherFinished(GatherResults.STOLEN);
      } else {
        this.stolen = true;
      }
    } else {
      this.account.state = AccountStates.GATHERING;
      this.onGatherStarted.trigger();
    }
  }

  private async HandleInteractiveUseEndedMessage(account: Account, message: any) {
    this.account.state = AccountStates.NONE;
    this.isGatherFinished(GatherResults.GATHERED);
  }

  private async HandleInteractiveUseErrorMessage(account: Account, message: any) {
    this.blacklistedElements.push(this.elementToGather.id);
    this.isGatherFinished(GatherResults.BLACKLISTED);
  }
}
