import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import ObjectEntry from "@game/character/inventory/ObjectEntry";
import DataManager from "@protocol/data";
import Items from "@protocol/data/classes/Items";
import { DialogTypeEnum } from "@protocol/enums/DialogTypeEnum";
import LiteEvent from "@utils/LiteEvent";

export default class Storage {
  public objects: ObjectEntry[];
  public kamas: number;

  public get StorageStarted() { return this.onStorageStarted.expose(); }
  private readonly onStorageStarted = new LiteEvent<void>();
  public get StorageUpdated() { return this.onStorageUpdated.expose(); }
  private readonly onStorageUpdated = new LiteEvent<void>();
  public get StorageLeft() { return this.onStorageLeft.expose(); }
  private readonly onStorageLeft = new LiteEvent<void>();

  private account: Account;

  public get ServerSelected() { return this.onServerSelected.expose(); }
  private readonly onServerSelected = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.objects = new Array<ObjectEntry>();
  }

  public putItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }
    const item = this.account.game.character.inventory.getObjectByGid(gid);
    if (item === null) {
      return false;
    }

    quantity = quantity === 0 ? item.quantity : (quantity > item.quantity ? item.quantity : quantity);

    this.account.network.sendMessage("ExchangeObjectMoveMessage", {
      objectUID: item.uid,
      quantity,
    });

    this.account.logger.logInfo("", `Vous avez ajouté ${quantity} ${item.name} dans le coffre.`);
    return true;
  }

  public getItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }
    const item = this.objects.find((o) => o.gid === gid);
    if (item === undefined) {
      return false;
    }

    quantity = quantity === 0 ? item.quantity : (quantity > item.quantity ? item.quantity : quantity);

    this.account.network.sendMessage("ExchangeObjectMoveMessage", {
      objectUID: item.uid,
      quantity: quantity * -1,
    });

    this.account.logger.logInfo("", `Vous avez retiré ${quantity} ${item.name} du coffre.`);
    return true;
  }

  public putKamas(quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }

    quantity = quantity === 0 ? this.account.game.character.inventory.kamas :
      (quantity > this.account.game.character.inventory.kamas ? this.account.game.character.inventory.kamas : quantity);

    // TODO: See if we really have to check the quantity here.
    if (quantity > 0) {
      this.account.network.sendMessage("ExchangeObjectMoveKamaMessage", { quantity });
      this.account.logger.logInfo("", `Vous avez ajouté ${quantity} kamas dans le coffre.`);
      return true;
    }

    return false;
  }

  public getKamas(quantity: number): boolean {
    if (this.account.state !== AccountStates.STORAGE || quantity < 0) {
      return false;
    }

    quantity = quantity === 0 ? this.kamas : (quantity > this.kamas ? this.kamas : quantity);

    // TODO: See if we really have to check the quantity here.
    if (quantity > 0) {
      this.account.network.sendMessage("ExchangeObjectMoveKamaMessage", { quantity: quantity * -1 });
      this.account.logger.logInfo("", `Vous avez retiré ${quantity} kamas du coffre.`);
      return true;
    }

    return false;
  }

  public putAllItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessage("ExchangeObjectTransfertAllFromInvMessage");
    this.account.logger.logInfo("", `Vous avez ajouté tous les objets de votre inventaire dans le coffre.`);
    return true;
  }

  public getAllItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessage("ExchangeObjectTransfertAllToInvMessage");
    this.account.logger.logInfo("", `Vous avez recupéré tous les objets de votre coffre dans votre inventaire`);
    return true;
  }

  public putExistingItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessage("ExchangeObjectTransfertExistingFromInvMessage");
    this.account.logger.logInfo("", `Tous les objets déjà présent dans votre coffre y ont été ajoutés.`);
    return true;
  }

  public getExistingItems(): boolean {
    if (this.account.state !== AccountStates.STORAGE) {
      return false;
    }

    this.account.network.sendMessage("ExchangeObjectTransfertExistingToInvMessage");
    this.account.logger.logInfo("", `Tous les objets déjà présent dans votre inventaire ont été récupéré du coffre.`);
    return true;
  }

  public async UpdateExchangeStartedWithStorageMessage(message: any) {
    this.account.state = AccountStates.STORAGE;
  }

  public async UpdateStorageInventoryContentMessage(message: any) {
    this.kamas = message.kamas;
    this.objects = [];

    const objects = await DataManager.get(Items, ...message.objects.map((o: any) => o.objectGID));

    for (const obj of message.objects) {
      const oe = objects.find((f) => f.id === obj.objectGID).object;
      this.objects.push(new ObjectEntry(obj, oe));
    }

    this.onStorageStarted.trigger();
  }

  public async UpdateStorageKamasUpdateMessage(message: any) {
    this.kamas = message.kamasTotal;
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectUpdateMessage(message: any) {
    const obj = this.objects.find((o) => o.uid === message.object.objectUID);

    // Needs to be added
    if (obj === undefined) {
      const data = await DataManager.get(Items, message.object.objectGID);
      this.objects.push(new ObjectEntry(message.object, data[0].object));
    } else {
      // Needs to be updated
      obj.UpdateObjectItem(message.object);
    }
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectRemoveMessage(message: any) {
    this.objects = this.objects.filter((o) => o.uid !== message.objectUID);
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectsUpdateMessage(message: any) {
    for (const item of message.objectList) {
      const obj = this.objects.find((o) => o.uid === item.objectUID);

      // Need to be added
      if (obj === undefined) {
        const data = await DataManager.get(Items, item.objectGID);
        this.objects.push(new ObjectEntry(item, data[0].object));
      } else {
        // Needs to be updated
        obj.UpdateObjectItem(item);
      }
    }
    this.onStorageUpdated.trigger();
  }

  public async UpdateStorageObjectsRemoveMessage(message: any) {
    for (const item of message.objectUIDList) {
      this.objects = this.objects.filter((o) => o.uid !== item);
    }
    this.onStorageUpdated.trigger();
  }

  public async UpdateExchangeLeaveMessage(message: any) {
    if (message.dialogType === DialogTypeEnum.DIALOG_EXCHANGE &&
      this.account.state === AccountStates.STORAGE) {
      this.account.state = AccountStates.NONE;
      this.objects = [];
      this.kamas = 0;
      this.onStorageLeft.trigger();
    }
  }
}
