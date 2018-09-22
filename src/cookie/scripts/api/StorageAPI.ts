import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import StorageGetAllItemsAction from "@/scripts/actions/storage/StorageGetAllItemsAction";
import StorageGetExistingItemsAction from "@/scripts/actions/storage/StorageGetExistingItemsAction";
import StorageGetItemAction from "@/scripts/actions/storage/StorageGetItemAction";
import StorageGetKamasAction from "@/scripts/actions/storage/StorageGetKamasAction";
import StoragePutAllItemsAction from "@/scripts/actions/storage/StoragePutAllItemsAction";
import StoragePutExistingItemsAction from "@/scripts/actions/storage/StoragePutExistingItemsAction";
import StoragePutItemAction from "@/scripts/actions/storage/StoragePutItemAction";
import StoragePutKamasAction from "@/scripts/actions/storage/StoragePutKamasAction";

export default class StorageAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public kamas(): number {
    return this.account.game.storage.kamas;
  }

  public itemCount(gid: number): number {
    return this.account.game.storage.objects
      .Where(o => o !== undefined && o.gid === gid)
      .Sum(o => (o !== undefined && o.quantity) || 0);
  }

  public async putItem(gid: number, quantity: number): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    if (
      this.account.game.character.inventory
        .getObjectsByGid(gid)
        .Sum(o => (o !== undefined && o.quantity) || 0) === 0
    ) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StoragePutItemAction(gid, quantity),
      true
    );
    return true;
  }

  public async getItem(gid: number, quantity: number): Promise<boolean> {
    if (this.itemCount(gid) === 0) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StorageGetItemAction(gid, quantity),
      true
    );
    return true;
  }

  public async putKamas(quantity: number): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StoragePutKamasAction(quantity),
      true
    );
    return true;
  }

  public async getKamas(quantity: number): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StorageGetKamasAction(quantity),
      true
    );
    return true;
  }

  public async putAllItems(): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StoragePutAllItemsAction(),
      true
    );
    return true;
  }

  public async getAllItems(): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StorageGetAllItemsAction(),
      true
    );
    return true;
  }

  public async putExistingItems(): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StoragePutExistingItemsAction(),
      true
    );
    return true;
  }

  public async getExistingItems(): Promise<boolean> {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new StorageGetExistingItemsAction(),
      true
    );
    return true;
  }
}
