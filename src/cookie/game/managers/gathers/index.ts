import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import Pathfinder from "@/core/pathfinder";
import MapPoint from "@/core/pathfinder/MapPoint";
import MovementsManager from "@/game/managers/movements";
import { MovementRequestResults } from "@/game/managers/movements/MovementRequestResults";
import MapGame from "@/game/map";
import InteractiveElementEntry from "@/game/map/interactives/InteractiveElementEntry";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";

export enum GatherResults {
  GATHERED,
  FAILED,
  STOLEN,
  BLACKLISTED,
  TIMED_OUT
}

export default class GathersManager implements IClearable {
  private account: Account;
  private blacklistedElements: number[];
  private elementToGather: InteractiveElementEntry | null = null;
  private pathfinder: Pathfinder;
  private stolen: boolean = false;
  private readonly onGatherStarted = new LiteEvent<void>();
  private readonly onGatherFinished = new LiteEvent<GatherResults>();

  constructor(account: Account, movements: MovementsManager, map: MapGame) {
    this.account = account;
    this.blacklistedElements = [];
    this.pathfinder = new Pathfinder();
    movements.MovementFinished.on(this.onMovementFinished);
    map.MapChanged.on(this.mapChanged);
    this.account.network.registerMessage(
      "InteractiveUsedMessage",
      this.handleInteractiveUsedMessage
    );
    this.account.network.registerMessage(
      "InteractiveUseEndedMessage",
      this.handleInteractiveUseEndedMessage
    );
    this.account.network.registerMessage(
      "InteractiveUseErrorMessage",
      this.handleInteractiveUseErrorMessage
    );
  }

  public get GatherFinished() {
    return this.onGatherFinished.expose();
  }

  public get GatherStarted() {
    return this.onGatherStarted.expose();
  }

  public clear() {
    this.elementToGather = null;
    this.blacklistedElements = [];
    this.stolen = false;
  }

  public canGather(...resourcesIds: number[]): boolean {
    return this.getUsableElements(...resourcesIds).size > 0;
  }

  public cancelGather() {
    this.elementToGather = null;
  }

  public gather(...resourcesIds: number[]): boolean {
    if (this.account.isBusy || this.elementToGather !== null) {
      this.account.logger.logWarning(
        LanguageManager.trans("gathersManager"),
        LanguageManager.trans("gatherBusy", AccountStates[this.account.state])
      );
      return false;
    }
    for (const kvp of this.getUsableElements(...resourcesIds)) {
      if (this.moveToElement(kvp)) {
        return true;
      }
    }

    this.account.logger.logWarning(
      LanguageManager.trans("gathersManager"),
      LanguageManager.trans("noGather")
    );
    return false;
  }

  private getUsableElements(
    ...resourcesIds: number[]
  ): Map<number, InteractiveElementEntry> {
    const usableElements = new Map<number, InteractiveElementEntry>();
    const hasFishingRod = this.account.game.character.inventory.hasFishingRod;
    const weaponRange = this.account.game.character.inventory.weaponRange;

    for (const interactive of this.account.game.map.interactives) {
      // The element must be usable
      if (!interactive.usable) {
        continue;
      }
      // Check if the element is blacklisted
      if (this.blacklistedElements.includes(interactive.id)) {
        continue;
      }

      // Check if this interactive is something we want
      if (!resourcesIds.includes(interactive.elementTypeId)) {
        continue;
      }

      const statedElement = this.account.game.map.getStatedElement(
        interactive.id
      );

      if (!statedElement || !this.account.game.map.playedCharacter) {
        continue;
      }

      const elem = MapPoint.fromCellId(statedElement.cellId);

      if (!elem) {
        continue;
      }

      const path = this.pathfinder.getPath(
        this.account.game.map.playedCharacter.cellId,
        statedElement.cellId,
        this.account.game.map.occupiedCells,
        this.account.game.map.monstersGroups,
        true,
        true,
        this.account.config.antiAgro
      );

      // If the path if invalid.
      if (path.length === 0) {
        continue;
      }

      // Check the distance between where we will be and the element we're interested in
      // If we have a fishing rod, we need to compare if with the rod's range,
      // otherwise we'll compare it to 1
      const lastCell = MapPoint.fromCellId(path[path.length - 1]);

      if (!lastCell) {
        continue;
      }

      const distToCell = lastCell.distanceToCell(elem);
      const distTo = lastCell.distanceTo(elem);
      if (
        (hasFishingRod && distToCell <= weaponRange) ||
        (!hasFishingRod && distTo === 1)
      ) {
        // Check if this path ends with a group of monsters
        if (
          this.account.game.map.monstersGroups.find(
            mg => mg.cellId === path[path.length - 1]
          ) !== undefined
        ) {
          continue;
        }
        usableElements.set(statedElement.cellId, interactive);
      }
    }
    return usableElements;
  }

  private moveToElement(element: [number, InteractiveElementEntry]): boolean {
    this.elementToGather = element["1"];

    // Assuming there is no way statedElem will be null
    switch (
      this.account.game.managers.movements.moveToCell(element["0"], true)
    ) {
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
      this.account.logger.logInfo(
        LanguageManager.trans("gathersManager"),
        LanguageManager.trans("stolenResource")
      );
      this.isGatherFinished(GatherResults.STOLEN);
    } else {
      if (!this.elementToGather) {
        return;
      }
      this.account.network.sendMessageFree("InteractiveUseRequestMessage", {
        elemId: this.elementToGather.id,
        skillInstanceUid: this.elementToGather.enabledSkills[0].instanceUid
      });
    }
  }

  private mapChanged = () => {
    this.pathfinder.setMap(this.account.game.map.data);
    this.blacklistedElements = [];
  };

  private isGatherFinished(result: GatherResults) {
    this.stolen = false;
    this.elementToGather = null;
    this.onGatherFinished.trigger(result);
  }

  private onMovementFinished = (success?: boolean) => {
    if (this.elementToGather === null) {
      return;
    }
    if (success) {
      this.tryUsingElementToGather();
    } else {
      this.isGatherFinished(GatherResults.FAILED);
    }
  };

  private handleInteractiveUsedMessage = async (
    account: Account,
    message: any
  ) => {
    if (
      this.elementToGather === null ||
      this.elementToGather.id !== message.elemId
    ) {
      return;
    }
    // Check if the element has been STOLEN
    if (message.entityId !== this.account.game.character.id) {
      this.stolen = true;
    } else {
      this.account.state = AccountStates.GATHERING;
      this.onGatherStarted.trigger();
    }
  };

  private handleInteractiveUseEndedMessage = async (
    account: Account,
    message: any
  ) => {
    this.account.state = AccountStates.NONE;
    this.isGatherFinished(GatherResults.GATHERED);
  };

  private handleInteractiveUseErrorMessage = async (
    account: Account,
    message: any
  ) => {
    if (!this.elementToGather) {
      return;
    }
    this.blacklistedElements.push(this.elementToGather.id);
    this.isGatherFinished(GatherResults.BLACKLISTED);
  };
}
