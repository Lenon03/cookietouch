import Account from "@/account";
import MovementsManager from "@/game/managers/movements";
import { MovementRequestResults } from "@/game/managers/movements/MovementRequestResults";
import InteractiveElementEntry from "@/game/map/interactives/InteractiveElementEntry";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";

export default class InteractivesManager implements IClearable {
  private _account: Account;
  private _interactiveToUse: InteractiveElementEntry | null = null;
  private _lockCode: string | null = null;
  private _skillInstanceUid: number = 0;
  private readonly onUseFinished = new LiteEvent<boolean>();

  constructor(account: Account, movements: MovementsManager) {
    this._account = account;
    this.clear(); // TODO: Maybe we don't need this
    movements.MovementFinished.on(success => {
      if (this._interactiveToUse === null) {
        return;
      }
      if (success) {
        this.useElement();
      } else {
        this.isUseFinished(false);
      }
    });
    this._account.network.registerMessage(
      "ExchangeStartOkCraftWithInformationMessage",
      this.handleInteractiveUsedMessage
    );

    this._account.network.registerMessage(
      "InteractiveUsedMessage",
      this.handleInteractiveUsedMessage
    );
    this._account.network.registerMessage(
      "InteractiveUseErrorMessage",
      this.handleInteractiveUseErrorMessage
    );
    this._account.network.registerMessage(
      "LockableShowCodeDialogMessage",
      this.handleLockableShowCodeDialogMessage
    );
    this._account.network.registerMessage(
      "LockableCodeResultMessage",
      this.handleLockableCodeResultMessage
    );
    this._account.network.registerMessage(
      "LockableStateUpdateHouseDoorMessage",
      this.handleLockableStateUpdateHouseDoorMessage
    );
    this._account.network.registerMessage(
      "LockableStateUpdateStorageMessage",
      this.handleLockableStateUpdateStorageMessage
    );
  }

  public get UseFinished() {
    return this.onUseFinished.expose();
  }

  public getElementOnCell(cellId: number): InteractiveElementEntry | null {
    // Search for a stated element in the cellId
    // (not sure if its good to search in stated elements)
    const statedElem = this._account.game.map.statedElements.find(
      s => s.cellId === cellId
    );

    if (statedElem !== undefined && statedElem.state === 0) {
      return (
        this._account.game.map.getInteractiveElement(statedElem.id) || null
      );
    }

    // Search for a door in the cellId
    const door = this._account.game.map.doors.find(d => d.cellId === cellId);
    if (door !== undefined) {
      return door.element;
    }

    // Search for a phenix in the cellId
    const phenix = this._account.game.map.phenixs.find(
      p => p.cellId === cellId
    );
    if (phenix !== undefined) {
      return phenix.element;
    }

    // Search for a locked storage in the cellId
    const lockedStorage = this._account.game.map.lockedStorages.find(
      l => l.cellId === cellId
    );
    if (lockedStorage !== undefined) {
      return lockedStorage.element;
    }

    return null;
  }

  public useInteractive(interactiveId: number, skillInstanceUid = -1): boolean {
    const interactive = this._account.game.map.getInteractiveElement(
      interactiveId
    );
    if (!interactive || !interactive.usable) {
      return false;
    }

    const statedElem = this._account.game.map.getStatedElement(interactiveId);
    if (!statedElem || statedElem.state !== 0) {
      return false;
    }

    return this.moveToUseInteractive(
      interactive,
      statedElem.cellId,
      skillInstanceUid
    );
  }

  public useInteractiveByCellId(
    cellId: number,
    skillInstanceUid = -1
  ): boolean {
    const interactive = this.getElementOnCell(cellId);
    return (
      interactive !== null &&
      this.moveToUseInteractive(interactive, cellId, skillInstanceUid)
    );
  }

  public useLockedDoor(doorCellId: number, lockCode: string): boolean {
    if (lockCode.length <= 0 || lockCode.length > 8) {
      return false;
    }

    const interactive = this.getElementOnCell(doorCellId);

    return (
      interactive !== null &&
      this.moveToUseInteractive(interactive, doorCellId, -1, lockCode)
    );
  }

  public useLockedStorage(cellId: number, lockCode: string): boolean {
    if (lockCode.length <= 0 || lockCode.length > 8) {
      return false;
    }

    const interactive = this.getElementOnCell(cellId);

    return (
      interactive !== null &&
      this.moveToUseInteractive(interactive, cellId, -1, lockCode)
    );
  }

  public cancelUse() {
    this._interactiveToUse = null;
  }

  public moveToUseInteractive(
    interactive: InteractiveElementEntry,
    cellId: number,
    skillInstanceUid: number,
    lockCode: string | null = null
  ): boolean {
    if (this._account.isBusy || this._interactiveToUse !== null) {
      return false;
    }

    if (interactive === null || !interactive.usable) {
      return false;
    }

    this._interactiveToUse = interactive;
    this._skillInstanceUid = skillInstanceUid;
    this._lockCode = lockCode;

    switch (this._account.game.managers.movements.moveToCell(cellId, true)) {
      case MovementRequestResults.MOVED: {
        return true;
      }
      case MovementRequestResults.ALREADY_THERE: {
        this.useElement();
        return true;
      }
      default: {
        // failed
        this.clear();
        return false;
      }
    }
  }

  public clear() {
    this._interactiveToUse = null;
    this._skillInstanceUid = 0;
    this._lockCode = null;
  }

  private useElement() {
    if (this._interactiveToUse === null) {
      return;
    }

    // In case the skill is negative (used like an index)
    if (this._skillInstanceUid < 0) {
      const index = this._skillInstanceUid * -1 - 1;

      // Check if the index is invalid
      if (this._interactiveToUse.enabledSkills.length <= index) {
        this.isUseFinished(false);
        return;
      }

      this._skillInstanceUid = this._interactiveToUse.enabledSkills[
        index
      ].instanceUid;
    }

    this._account.network.sendMessageFree("InteractiveUseRequestMessage", {
      elemId: this._interactiveToUse.id,
      skillInstanceUid: this._skillInstanceUid
    });
  }

  private isUseFinished(success: boolean) {
    this.clear();
    this.onUseFinished.trigger(success);
  }

  private handleInteractiveUsedMessage = (account: Account, message: any) => {
    if (
      this._interactiveToUse === null ||
      message.entityId !== this._account.game.character.id
    ) {
      return;
    }

    // Only fire this event when we're not using a locked door
    if (this._lockCode === null) {
      this.isUseFinished(true);
    }
  };

  private handleInteractiveUseErrorMessage = (
    account: Account,
    message: any
  ) => {
    if (this._interactiveToUse === null) {
      return;
    }

    this.isUseFinished(false);
  };

  private handleLockableShowCodeDialogMessage = async (
    account: Account,
    message: any
  ) => {
    await sleep(1000);

    if (this._interactiveToUse === null || this._lockCode === null) {
      return;
    }

    await account.network.sendMessageFree("LockableUseCodeMessage", {
      code: this._lockCode.padEnd(8, "_")
    });
  };

  private handleLockableCodeResultMessage = (
    account: Account,
    message: any
  ) => {
    if (this._interactiveToUse === null || this._lockCode === null) {
      return;
    }

    if (message.result !== 1) {
      return;
    }

    this.isUseFinished(false);
  };

  private handleLockableStateUpdateHouseDoorMessage = (
    account: Account,
    message: any
  ) => {
    if (this._interactiveToUse === null || this._lockCode === null) {
      return;
    }

    if (!message.locked) {
      this.isUseFinished(true);
    }
  };

  private handleLockableStateUpdateStorageMessage = (
    account: Account,
    message: any
  ) => {
    if (this._interactiveToUse === null || this._lockCode === null) {
      return;
    }

    if (!message.locked && message.elementId === this._interactiveToUse.id) {
      this.isUseFinished(true);
    }
  };
}
