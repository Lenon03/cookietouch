import Account from "@account";
import {CharacterInventoryPositionEnum} from "@protocol/enums/CharacterInventoryPositionEnum";
import DeleteItemAction from "../actions/inventory/DeleteItemAction";
import DropItemAction from "../actions/inventory/DropItemAction";
import EquipItemAction from "../actions/inventory/EquipItemAction";
import UnEquipItemAction from "../actions/inventory/UnEquipItemAction";
import UseItemAction from "../actions/inventory/UseItemAction";

export default class InventoryAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public get pods(): number {
    return this.account.game.character.inventory.weight;
  }

  public get podsMax(): number {
    return this.account.game.character.inventory.weightMax;
  }

  public get podsP(): number {
    return this.account.game.character.inventory.weightPercent;
  }

  public itemCount(gid: number): number {
    return this.account.game.character.inventory.getObjectsByGid(gid).Sum((o) => o.quantity);
  }

  public itemWeight(gid: number): number {
    const o = this.account.game.character.inventory.getObjectByGid(gid);
    return o ? o.realWeight : 0;
  }

  public useItem(gid: number, qty = 1): boolean {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UseItemAction(gid, qty), true);
    return true;
  }

  public equipItem(gid: number): boolean {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item || item.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new EquipItemAction(gid), true);
    return true;
  }

  public unEquipItem(gid: number): boolean {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item || item.position === CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new UnEquipItemAction(gid), true);
    return true;
  }

  public dropItem(gid: number, quantity = 1): boolean {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new DropItemAction(gid, quantity), true);
    return true;
  }

  public deleteItem(gid: number, quantity = 1): boolean {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new DeleteItemAction(gid, quantity), true);
    return true;
  }
}
