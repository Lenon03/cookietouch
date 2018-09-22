import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import InventoryHelper, {
  ObjectTypes
} from "@/game/character/inventory/InventoryHelper";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import { DataTypes } from "@/protocol/data/DataTypes";
import { CharacterInventoryPositionEnum } from "@/protocol/enums/CharacterInventoryPositionEnum";
import CharacterStatsListMessage from "@/protocol/network/messages/CharacterStatsListMessage";
import InventoryContentMessage from "@/protocol/network/messages/InventoryContentMessage";
import InventoryWeightMessage from "@/protocol/network/messages/InventoryWeightMessage";
import KamasUpdateMessage from "@/protocol/network/messages/KamasUpdateMessage";
import ObjectAddedMessage from "@/protocol/network/messages/ObjectAddedMessage";
import ObjectDeletedMessage from "@/protocol/network/messages/ObjectDeletedMessage";
import ObjectModifiedMessage from "@/protocol/network/messages/ObjectModifiedMessage";
import ObjectMovementMessage from "@/protocol/network/messages/ObjectMovementMessage";
import ObjectQuantityMessage from "@/protocol/network/messages/ObjectQuantityMessage";
import ObjectsAddedMessage from "@/protocol/network/messages/ObjectsAddedMessage";
import ObjectsDeletedMessage from "@/protocol/network/messages/ObjectsDeletedMessage";
import ObjectsQuantityMessage from "@/protocol/network/messages/ObjectsQuantityMessage";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import LiteEvent from "@/utils/LiteEvent";
import { List } from "linqts";

export default class Inventory {
  public kamas: number = 0;
  public weight: number = 0;
  public weightMax: number = 0;

  private account: Account;
  private _fallbackMaxWeight: number = 0;
  private _objects = new Map<number, ObjectEntry>();
  private readonly onInventoryUpdated = new LiteEvent<boolean>();
  private readonly onObjectGained = new LiteEvent<number>();
  private readonly onObjectEquipped = new LiteEvent<number>();

  constructor(account: Account) {
    this.account = account;
  }

  get objects() {
    return new List(Array.from(this._objects.values()));
  }

  get equipments() {
    return this.objects.Where(
      o => o !== undefined && o.type === ObjectTypes.EQUIPMENT
    );
  }

  get consumables() {
    return this.objects.Where(
      o => o !== undefined && o.type === ObjectTypes.CONSUMABLE
    );
  }

  get resources() {
    return this.objects.Where(
      o => o !== undefined && o.type === ObjectTypes.RESOURCES
    );
  }

  get questObjects() {
    return this.objects.Where(
      o => o !== undefined && o.type === ObjectTypes.QUEST_OBJECT
    );
  }

  get weightPercent() {
    return this.weightMax === 0 ? 0 : (this.weight / this.weightMax) * 100;
  }

  get hasFishingRod() {
    return (
      this.objects.FirstOrDefault(
        o =>
          o !== undefined &&
          o.position ===
            CharacterInventoryPositionEnum.ACCESSORY_POSITION_WEAPON &&
          o.isFishingRod
      ) !== undefined
    );
  }

  public get InventoryUpdated() {
    return this.onInventoryUpdated.expose();
  }

  public get ObjectGained() {
    return this.onObjectGained.expose();
  }

  public get ObjectEquipped() {
    return this.onObjectEquipped.expose();
  }

  get weaponRange(): number {
    const tmp = this.getObjectInPosition(
      CharacterInventoryPositionEnum.ACCESSORY_POSITION_WEAPON
    );
    if (tmp !== undefined) {
      return tmp.range;
    }
    return 0;
  }

  public getObjectByUid(uid: number) {
    return this.objects.FirstOrDefault(o => o !== undefined && o.uid === uid);
  }

  public getObjectByGid(gid: number) {
    return this.objects.FirstOrDefault(o => o !== undefined && o.gid === gid);
  }

  public getObjectsByGid(gid: number) {
    return this.objects.Where(o => o !== undefined && o.gid === gid);
  }

  public getObjectInPosition(pos: CharacterInventoryPositionEnum) {
    return this.objects.FirstOrDefault(
      o => o !== undefined && o.position === pos
    );
  }

  public equipObject(obj: ObjectEntry): boolean {
    if (obj === undefined) {
      return false;
    }

    if (
      obj.position !==
      CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
    ) {
      return false;
    }

    const possiblePositions = InventoryHelper.getPossiblePositions(
      obj.superTypeId
    );

    if (!possiblePositions || possiblePositions.length === 0) {
      return false;
    }

    for (const pos of possiblePositions) {
      if (this.getObjectInPosition(pos) === null) {
        this.account.network.sendMessageFree("ObjectSetPositionMessage", {
          objectUID: obj.uid,
          position: pos,
          quantity: 1
        });
        this.account.logger.logDebug(
          LanguageManager.trans("inventory"),
          LanguageManager.trans("objectEquipped", obj.name)
        );
        return true;
      }
    }

    // If we didn't find an empty place, just equip it in the first possible position
    this.account.network.sendMessageFree("ObjectSetPositionMessage", {
      objectUID: obj.uid,
      position: possiblePositions[0],
      quantity: 1
    });
    this.account.logger.logDebug(
      LanguageManager.trans("inventory"),
      LanguageManager.trans("objectEquipped", obj.name)
    );
    return true;
  }

  public unEquipObject(obj: ObjectEntry): boolean {
    if (obj === undefined) {
      return false;
    }

    if (
      obj.position ===
      CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
    ) {
      return false;
    }

    this.account.network.sendMessageFree("ObjectSetPositionMessage", {
      objectUID: obj.uid,
      position: CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED,
      quantity: 1
    });
    this.account.logger.logDebug(
      LanguageManager.trans("inventory"),
      LanguageManager.trans("objectUnEquipped", obj.name)
    );
    return true;
  }

  public useObject(obj: ObjectEntry | null, qty = 1) {
    if (!obj) {
      return;
    }

    if (qty === 1) {
      this.account.network.sendMessageFree("ObjectUseMessage", {
        objectUID: obj.uid
      });
    } else {
      qty = qty <= 0 ? obj.quantity : qty > obj.quantity ? obj.quantity : qty;

      this.account.network.sendMessageFree("ObjectUseMultipleMessage", {
        objectUID: obj.uid,
        quantity: qty
      });
    }
    this.account.logger.logDebug(
      LanguageManager.trans("inventory"),
      LanguageManager.trans("objectUsed", qty, obj.name)
    );
  }

  public dropObject(obj: ObjectEntry | null, qty = 1) {
    if (!obj) {
      return;
    }

    qty = qty <= 0 ? obj.quantity : qty > obj.quantity ? obj.quantity : qty;

    this.account.network.sendMessageFree("ObjectDropMessage", {
      objectUID: obj.uid,
      quantity: qty
    });
    this.account.logger.logDebug(
      LanguageManager.trans("inventory"),
      LanguageManager.trans("objectDropped", qty, obj.name)
    );
  }

  public deleteObject(obj: ObjectEntry | null, qty = 1) {
    if (!obj) {
      return;
    }

    qty = qty <= 0 ? obj.quantity : qty > obj.quantity ? obj.quantity : qty;

    this.account.network.sendMessageFree("ObjectDeleteMessage", {
      objectUID: obj.uid,
      quantity: qty
    });
    this.account.logger.logDebug(
      LanguageManager.trans("inventory"),
      LanguageManager.trans("objectDeleted", qty, obj.name)
    );
  }

  public async UpdateInventoryContentMessage(message: InventoryContentMessage) {
    this._objects = new Map<number, ObjectEntry>();
    this.kamas = message.kamas;

    const items = await DataManager.get<Items>(
      DataTypes.Items,
      ...message.objects.map(o => o.objectGID)
    );
    for (const obj of message.objects) {
      const item = items.find(f => f.id === obj.objectGID);
      const object = item && item.object;
      const entry = await ObjectEntry.setup(obj, object);
      this._objects.set(obj.objectUID, entry);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectAddedMessage(message: ObjectAddedMessage) {
    const obj = await ObjectEntry.setup(message.object);
    this._objects.set(message.object.objectUID, obj);
    this.onObjectGained.trigger(obj.gid);
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectsAddedMessage(message: ObjectsAddedMessage) {
    const items = await DataManager.get<Items>(
      DataTypes.Items,
      ...message.object.map(o => o.objectGID)
    );

    for (const obj of message.object) {
      const item = items.find(f => f.id === obj.objectGID);
      const object = item && item.object;
      const entry = await ObjectEntry.setup(obj, object);
      this._objects.set(obj.objectUID, entry);
    }

    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectDeletedMessage(message: ObjectDeletedMessage) {
    this._objects.delete(message.objectUID);
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectsDeletedMessage(message: ObjectsDeletedMessage) {
    for (const uid of message.objectUID) {
      this._objects.delete(uid);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectModifiedMessage(message: ObjectModifiedMessage) {
    const obj = this._objects.get(message.object.objectUID);
    if (obj !== undefined) {
      obj.UpdateObjectItem(message.object);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectMovementMessage(message: ObjectMovementMessage) {
    const obj = this._objects.get(message.objectUID);
    if (obj !== undefined) {
      obj.UpdateObjectMovementMessage(message);

      if (
        obj.position !==
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
      ) {
        this.onObjectEquipped.trigger(obj.gid);
      }
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectQuantityMessage(message: ObjectQuantityMessage) {
    const obj = this._objects.get(message.objectUID);
    if (obj !== undefined) {
      obj.UpdateQuantity(message.quantity);
      this.onObjectGained.trigger(obj.gid);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectsQuantityMessage(message: ObjectsQuantityMessage) {
    for (const o of message.objectsUIDAndQty) {
      const obj = this._objects.get(o.objectUID);
      if (obj !== undefined) {
        obj.UpdateQuantity(o.quantity);
        this.onObjectGained.trigger(obj.gid);
      }
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateInventoryWeightMessage(message: InventoryWeightMessage) {
    this.weight = message.weight;
    this._fallbackMaxWeight = message.weightMax;
    this.resetMaxWeight();
    this.onInventoryUpdated.trigger(false);
  }

  public async UpdateKamasUpdateMessage(message: KamasUpdateMessage) {
    this.kamas = message.kamasTotal;
    this.onInventoryUpdated.trigger(false);
  }

  public async UpdateCharacterStatsListMessage(
    message: CharacterStatsListMessage
  ) {
    this.kamas = message.stats.kamas;
    this.resetMaxWeight();
    this.onInventoryUpdated.trigger(false);
  }

  private resetMaxWeight() {
    try {
      const job = this.account.game.character.jobs.jobs.Sum(
        j => (j && j.level) || 0
      );
      const jobCount = this.account.game.character.jobs.jobs.Count(
        j => (j && j.level === 100) || false
      );
      const strength = this.totalStat(
        this.account.game.character.stats.strength
      );
      const boost = this.account.game.character.inventory.equipments.Sum(
        e => (e && e.weightBoost) || 0
      );
      this.weightMax =
        !job || !jobCount || !strength || !boost
          ? this._fallbackMaxWeight
          : 1000 + 5 * job + 1000 * jobCount + 5 * strength + boost;
    } catch (e) {
      this.weightMax = this._fallbackMaxWeight;
    }
  }

  private totalStat(stat: CharacterBaseCharacteristic): number {
    return (
      stat.base +
      stat.objectsAndMountBonus +
      stat.alignGiftBonus +
      stat.contextModif
    );
  }
}
