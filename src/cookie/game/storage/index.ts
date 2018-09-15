import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import { DataTypes } from "@/protocol/data/DataTypes";
import { DialogTypeEnum } from "@/protocol/enums/DialogTypeEnum";
import StorageInventoryContentMessage from "@/protocol/network/messages/StorageInventoryContentMessage";
import LiteEvent from "@/utils/LiteEvent";
import { List } from "linqts";

export default class Storage {
  public objects: List<ObjectEntry>;
  public kamas: number;
  private readonly onStorageStarted = new LiteEvent<void>();
  private readonly onStorageUpdated = new LiteEvent<void>();
  private readonly onStorageLeft = new LiteEvent<void>();
  private account: Account;
  private readonly onServerSelected = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.objects = new List<ObjectEntry>();
  }

  public get StorageStarted() {
    return this.onStorageStarted.expose();
  }

  public get StorageUpdated() {
    return this.onStorageUpdated.expose();
  }

  public get StorageLeft() {
    return this.onStorageLeft.expose();
  }

  public get ServerSelected() {
    return this.onServerSelected.expose();
  }

  public putItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (!item) {
      return false;
    }

    quantity =
      quantity === 0
        ? item.quantity
        : quantity > item.quantity
          ? item.quantity
          : quantity;

    this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
      objectUID: item.uid,
      quantity
    });

    this.account.logger.logInfo(
      LanguageManager.trans("storage"),
      LanguageManager.trans("storageAdded", quantity, item.name)
    );
    return true;
  }

  public getItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }
    const item = this.objects.FirstOrDefault(o => o.gid === gid);
    if (!item) {
      return false;
    }

    quantity =
      quantity === 0
        ? item.quantity
        : quantity > item.quantity
          ? item.quantity
          : quantity;

    this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
      objectUID: item.uid,
      quantity: quantity * -1
    });

    this.account.logger.logInfo(
      LanguageManager.trans("storage"),
      LanguageManager.trans("storageRemoved", quantity, item.name)
    );
    return true;
  }

  public putKamas(quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }

    quantity =
      quantity === 0
        ? this.account.game.character.inventory.kamas
        : quantity > this.account.game.character.inventory.kamas
          ? this.account.game.character.inventory.kamas
          : quantity;

    // TODO: See if we really have to check the quantity here.
    if (quantity > 0) {
      this.account.network.sendMessageFree("ExchangeObjectMoveKamaMessage", {
        quantity
      });
      this.account.logger.logInfo(
        LanguageManager.trans("storage"),
        LanguageManager.trans("storageKamasAdded", quantity)
      );
      return true;
    }

    return false;
  }

  public getKamas(quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }

    quantity =
      quantity === 0
        ? this.kamas
        : quantity > this.kamas
          ? this.kamas
          : quantity;

    // TODO: See if we really have to check the quantity here.
    if (quantity > 0) {
      this.account.network.sendMessageFree("ExchangeObjectMoveKamaMessage", {
        quantity: quantity * -1
      });
      this.account.logger.logInfo(
        LanguageManager.trans("storage"),
        LanguageManager.trans("storageKamasRemoved", quantity)
      );
      return true;
    }

    return false;
  }

  public putAllItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessageFree(
      "ExchangeObjectTransfertAllFromInvMessage"
    );
    this.account.logger.logInfo(
      LanguageManager.trans("storage"),
      LanguageManager.trans("storageAllAdded")
    );
    return true;
  }

  public getAllItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessageFree(
      "ExchangeObjectTransfertAllToInvMessage"
    );
    this.account.logger.logInfo(
      LanguageManager.trans("storage"),
      LanguageManager.trans("storageAllRemoved")
    );
    return true;
  }

  public putExistingItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessageFree(
      "ExchangeObjectTransfertExistingFromInvMessage"
    );
    this.account.logger.logInfo(
      LanguageManager.trans("storage"),
      LanguageManager.trans("storageAddExistings")
    );
    return true;
  }

  public getExistingItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessageFree(
      "ExchangeObjectTransfertExistingToInvMessage"
    );
    this.account.logger.logInfo(
      LanguageManager.trans("storage"),
      LanguageManager.trans("storageRemoveExistings")
    );
    return true;
  }

  public async UpdateExchangeStartedWithStorageMessage(message: any) {
    this.account.state = AccountStates.STORAGE;
  }

  public async UpdateStorageInventoryContentMessage(
    message: StorageInventoryContentMessage
  ) {
    this.kamas = message.kamas;
    this.objects = new List<ObjectEntry>();

    const objects = await DataManager.get<Items>(
      DataTypes.Items,
      ...message.objects.map(o => o.objectGID)
    );

    for (const obj of message.objects) {
      const oe = objects.find(f => f.id === obj.objectGID).object;
      this.objects.Add(await ObjectEntry.setup(obj, oe));
    }

    this.onStorageStarted.trigger();
  }

  public async UpdateStorageKamasUpdateMessage(message: any) {
    this.kamas = message.kamasTotal;
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectUpdateMessage(message: any) {
    const obj = this.objects.FirstOrDefault(
      o => o.uid === message.object.objectUID
    );

    // Needs to be added
    if (obj === undefined) {
      const data = await DataManager.get<Items>(
        DataTypes.Items,
        message.object.objectGID
      );
      this.objects.Add(await ObjectEntry.setup(message.object, data[0].object));
    } else {
      // Needs to be updated
      obj.UpdateObjectItem(message.object);
    }
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectRemoveMessage(message: any) {
    this.objects = this.objects.RemoveAll(o => o.uid === message.objectUID);
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectsUpdateMessage(message: any) {
    for (const item of message.objectList) {
      const obj = this.objects.FirstOrDefault(o => o.uid === item.objectUID);

      // Need to be added
      if (obj === undefined) {
        const data = await DataManager.get<Items>(
          DataTypes.Items,
          item.objectGID
        );
        this.objects.Add(await ObjectEntry.setup(item, data[0].object));
      } else {
        // Needs to be updated
        obj.UpdateObjectItem(item);
      }
    }
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectsRemoveMessage(message: any) {
    for (const item of message.objectUIDList) {
      this.objects = this.objects.RemoveAll(o => o.uid === item);
    }
    this.onStorageUpdated.trigger();
  }

  public async UpdateExchangeLeaveMessage(message: any) {
    if (
      message.dialogType === DialogTypeEnum.DIALOG_EXCHANGE &&
      this.account.state === AccountStates.STORAGE
    ) {
      this.account.state = AccountStates.NONE;
      this.objects = new List<ObjectEntry>();
      this.kamas = 0;
      this.onStorageLeft.trigger();
    }
  }
}
