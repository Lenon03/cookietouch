import Account from "@account";
import { TeleportablesEnum } from "@game/managers/teleportables";
import JoinFriendAction from "../actions/global/JoinFriendAction";
import ChangeMapAction from "../actions/map/ChangeMapAction";
import MoveToCellAction from "../actions/map/MoveToCellAction";
import SaveZaapAction from "../actions/map/SaveZaapAction";
import UseAction from "../actions/map/UseAction";
import UseByIdAction from "../actions/map/UseByIdAction";
import UseLockedHouseAction from "../actions/map/UseLockedHouseAction";
import UseLockedStorageAction from "../actions/map/UseLockedStorageAction";
import UseTeleportableAction from "../actions/map/UseTeleportableAction";
import WaitMapChangeAction from "../actions/map/WaitMapChangeAction";

export default class MapAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public changeMap(where: string): boolean {
    if (this.account.isBusy) {
      return false;
    }
    const action = ChangeMapAction.tryParse(where);
    if (!action) {
      this.account.logger.logWarning("API", `Can't parse changeMap. (${where})`);
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(action, true);
    return true;
  }

  public moveToCell(cellId: number): boolean {
    if (cellId < 0 || cellId > 559) {
      return false;
    }
    if (!this.account.game.map.data.cells[cellId].isWalkable(false) ||
      this.account.game.map.data.cells[cellId].isObstacle())  {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new MoveToCellAction(cellId), true);
    return true;
  }

  public useById(elementId: number, skillInstanceUid = -1): boolean {
    const interactive = this.account.game.map.getInteractiveElement(elementId);
    if (!interactive || interactive.usable === false) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseByIdAction(elementId, skillInstanceUid), true);
    return true;
  }

  public use(elementCellId: number, skillInstanceUid = -1): boolean {
    if (elementCellId < 0 || elementCellId > 559) {
      return false;
    }
    const interactive = this.account.game.managers.interactives.getElementOnCell(elementCellId);
    if (!interactive || interactive.usable === false) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseAction(elementCellId, skillInstanceUid), true);
    return true;
  }

  public useLockedHouse(doorCellId: number, lockCode: string): boolean {
    if (doorCellId < 0 || doorCellId > 559) {
      return false;
    }
    const interactive = this.account.game.managers.interactives.getElementOnCell(doorCellId);
    if (!interactive || interactive.usable === false) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseLockedHouseAction(doorCellId, lockCode), true);
    this.account.scripts.actionsManager.enqueueAction(new WaitMapChangeAction(20000), true);
    return true;
  }

  public useLockedStorage(elementCellId: number, lockCode: string): boolean {
    if (elementCellId < 0 || elementCellId > 559) {
      return false;
    }
    const lockedStorage = this.account.game.map.lockedStorages.find((ls) => ls.cellId === elementCellId);
    if (!lockedStorage || lockedStorage.element.usable === false) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseLockedStorageAction(elementCellId, lockCode), true);
    return true;
  }

  public saveZaap(): boolean {
    if (!this.account.game.map.zaap) {
      this.account.logger.logWarning("TeleportablesManager", "There is no zaap on this map.");
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new SaveZaapAction(), true);
    return true;
  }

  public useZaap(destinationMapId: number): boolean {
    if (!this.account.game.map.zaap) {
      this.account.logger.logWarning("TeleportablesManager", "There is no zaap on this map.");
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseTeleportableAction(TeleportablesEnum.ZAAP, destinationMapId), true);
    return true;
  }

  public useZaapi(destinationMapId: number): boolean {
    if (!this.account.game.map.zaapi) {
      this.account.logger.logWarning("TeleportablesManager", "There is no zaapi on this map.");
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseTeleportableAction(TeleportablesEnum.ZAAPI, destinationMapId), true);
    return true;
  }

  public waitMapChange(delay = 5000) {
    this.account.scripts.actionsManager.enqueueAction(new WaitMapChangeAction(delay), true);
  }

  public joinFriend(name: string) {
    this.account.scripts.actionsManager.enqueueAction(new JoinFriendAction(name), true);
  }

  public onCell(cellId: number): boolean {
    return this.account.game.map.playedCharacter.cellId === cellId;
  }

  public onMap(coords: string): boolean {
    return this.account.game.map.isOnMap(coords);
  }

  public currentPos(): string {
    return this.account.game.map.currentPosition;
  }

  public currentMapId(): string {
    return this.account.game.map.id.toString();
  }

  public area(): string {
    return this.account.game.map.area;
  }

  public subArea(): string {
    return this.account.game.map.subArea;
  }
}
