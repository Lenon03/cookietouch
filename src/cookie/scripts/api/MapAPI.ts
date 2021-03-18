import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import { TeleportablesEnum } from "@/game/managers/teleportables";
import JoinFriendAction from "@/scripts/actions/global/JoinFriendAction";
import ChangeMapAction from "@/scripts/actions/map/ChangeMapAction";
import MoveToCellAction from "@/scripts/actions/map/MoveToCellAction";
import SaveZaapAction from "@/scripts/actions/map/SaveZaapAction";
import UseAction from "@/scripts/actions/map/UseAction";
import UseByIdAction from "@/scripts/actions/map/UseByIdAction";
import UseLockedHouseAction from "@/scripts/actions/map/UseLockedHouseAction";
import UseLockedStorageAction from "@/scripts/actions/map/UseLockedStorageAction";
import UseTeleportableAction from "@/scripts/actions/map/UseTeleportableAction";
import WaitMapChangeAction from "@/scripts/actions/map/WaitMapChangeAction";

export default class MapAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public currentPos(): string {
    return this.account.game.map.currentPosition;
  }

  public currentMapId(): number {
    return this.account.game.map.id;
  }

  public area(): string {
    return this.account.game.map.area || "";
  }

  public subArea(): string {
    return this.account.game.map.subArea || "";
  }

  public async changeMap(where: string): Promise<boolean> {
    if (this.account.isBusy) {
      return false;
    }
    const action = ChangeMapAction.tryParse(where);
    if (!action) {
      this.account.logger.logWarning(
        LanguageManager.trans("api"),
        LanguageManager.trans("cantParseMap", where)
      );
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(action, true);
    return true;
  }

  public async moveToCell(cellId: number): Promise<boolean> {
    if (cellId < 0 || cellId > 559 || !this.account.game.map.data) {
      return false;
    }
    if (
      !this.account.game.map.data.cells[cellId].isWalkable(false) ||
      this.account.game.map.data.cells[cellId].isObstacle()
    ) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new MoveToCellAction(cellId),
      true
    );
    return true;
  }

  public async useById(
    elementId: number,
    skillInstanceUid = -1
  ): Promise<boolean> {
    const interactive = this.account.game.map.getInteractiveElement(elementId);
    if (!interactive || interactive.usable === false) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseByIdAction(elementId, skillInstanceUid),
      true
    );
    return true;
  }

  public async use(
    elementCellId: number,
    skillInstanceUid = -1
  ): Promise<boolean> {
    if (elementCellId < 0 || elementCellId > 559) {
      return false;
    }
    const interactive = this.account.game.managers.interactives.getElementOnCell(
      elementCellId
    );
    if (!interactive || interactive.usable === false) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseAction(elementCellId, skillInstanceUid),
      true
    );
    return true;
  }

  public async useLockedHouse(
    doorCellId: number,
    lockCode: string
  ): Promise<boolean> {
    if (doorCellId < 0 || doorCellId > 559) {
      return false;
    }
    const interactive = this.account.game.managers.interactives.getElementOnCell(
      doorCellId
    );
    if (!interactive || interactive.usable === false) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseLockedHouseAction(doorCellId, lockCode),
      true
    );
    await this.account.scripts.actionsManager.enqueueAction(
      new WaitMapChangeAction(20000),
      true
    );
    return true;
  }

  public async useLockedStorage(
    elementCellId: number,
    lockCode: string
  ): Promise<boolean> {
    if (elementCellId < 0 || elementCellId > 559) {
      return false;
    }
    const lockedStorage = this.account.game.map.lockedStorages.find(
      ls => ls.cellId === elementCellId
    );
    if (!lockedStorage || lockedStorage.element.usable === false) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseLockedStorageAction(elementCellId, lockCode),
      true
    );
    return true;
  }

  public async saveZaap(): Promise<boolean> {
    if (!this.account.game.map.zaap) {
      this.account.logger.logWarning(
        LanguageManager.trans("teleportablesManagers"),
        LanguageManager.trans("noZaap")
      );
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new SaveZaapAction(),
      true
    );
    return true;
  }

  public async useZaap(destinationMapId: number): Promise<boolean> {
    if (!this.account.game.map.zaap) {
      this.account.logger.logWarning(
        LanguageManager.trans("teleportablesManagers"),
        LanguageManager.trans("noZaap")
      );
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseTeleportableAction(TeleportablesEnum.ZAAP, destinationMapId),
      true
    );
    return true;
  }

  public async useZaapi(destinationMapId: number): Promise<boolean> {
    if (!this.account.game.map.zaapi) {
      this.account.logger.logWarning(
        LanguageManager.trans("teleportablesManagers"),
        LanguageManager.trans("noZaapi")
      );
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseTeleportableAction(TeleportablesEnum.ZAAPI, destinationMapId),
      true
    );
    return true;
  }

  public async waitMapChange(delay = 5000) {
    await this.account.scripts.actionsManager.enqueueAction(
      new WaitMapChangeAction(delay),
      true
    );
  }

  public async joinFriend(name: string) {
    await this.account.scripts.actionsManager.enqueueAction(
      new JoinFriendAction(name),
      true
    );
  }

  public onCell(cellId: number): boolean {
    if (!this.account.game.map.playedCharacter) {
      return false;
    }
    return this.account.game.map.playedCharacter.cellId === cellId;
  }

  public onMap(coords: string): boolean {
    return this.account.game.map.isOnMap(coords);
  }
}
