import Account from "@/account";
import { CharacterInventoryPositionEnum } from "@/protocol/enums/CharacterInventoryPositionEnum";
import DeleteItemAction from "@/scripts/actions/inventory/DeleteItemAction";
import DropItemAction from "@/scripts/actions/inventory/DropItemAction";
import EquipItemAction from "@/scripts/actions/inventory/EquipItemAction";
import UnEquipItemAction from "@/scripts/actions/inventory/UnEquipItemAction";
import UseItemAction from "@/scripts/actions/inventory/UseItemAction";

export default class InventoryAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public pods(): number {
    return this.account.game.character.inventory.weight;
  }

  public podsMax(): number {
    return this.account.game.character.inventory.weightMax;
  }

  public podsP(): number {
    return this.account.game.character.inventory.weightPercent;
  }

  public itemCount(gid: number): number {
    return this.account.game.character.inventory
      .getObjectsByGid(gid)
      .Sum(o => (o !== undefined && o.quantity) || 0);
  }

  public itemWeight(gid: number): number {
    const o = this.account.game.character.inventory.getObjectByGid(gid);
    return o ? o.realWeight : 0;
  }

  public async useItem(gid: number, qty = 1): Promise<boolean> {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UseItemAction(gid, qty),
      true
    );
    return true;
  }

  public async equipItem(gid: number): Promise<boolean> {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (
      !item ||
      item.position !==
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
    ) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new EquipItemAction(gid),
      true
    );
    return true;
  }

  public async unEquipItem(gid: number): Promise<boolean> {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (
      !item ||
      item.position ===
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
    ) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new UnEquipItemAction(gid),
      true
    );
    return true;
  }

  public async dropItem(gid: number, quantity = 1): Promise<boolean> {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new DropItemAction(gid, quantity),
      true
    );
    return true;
  }

  public async deleteItem(gid: number, quantity = 1): Promise<boolean> {
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new DeleteItemAction(gid, quantity),
      true
    );
    return true;
  }
}
