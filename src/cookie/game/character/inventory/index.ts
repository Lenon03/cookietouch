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
import InventoryContentMessage from "@/protocol/network/messages/InventoryContentMessage";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";
import { List } from "linqts";

export default class Inventory {
  public kamas: number;
  public weight: number;
  public weightMax: number;

  private account: Account;
  private _fallbackMaxWeight: number;
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
    return this.objects.Where(o => o.type === ObjectTypes.EQUIPMENT);
  }

  get consumables() {
    return this.objects.Where(o => o.type === ObjectTypes.CONSUMABLE);
  }

  get resources() {
    return this.objects.Where(o => o.type === ObjectTypes.RESOURCES);
  }

  get questObjects() {
    return this.objects.Where(o => o.type === ObjectTypes.QUEST_OBJECT);
  }

  get weightPercent() {
    return this.weightMax === 0 ? 0 : (this.weight / this.weightMax) * 100;
  }

  get hasFishingRod() {
    return (
      this.objects.FirstOrDefault(
        o =>
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
    return this.objects.FirstOrDefault(o => o.uid === uid);
  }

  public getObjectByGid(gid: number) {
    return this.objects.FirstOrDefault(o => o.gid === gid);
  }

  public getObjectsByGid(gid: number) {
    return this.objects.Where(o => o.gid === gid);
  }

  public getObjectInPosition(pos: CharacterInventoryPositionEnum) {
    return this.objects.FirstOrDefault(o => o.position === pos);
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

    if (possiblePositions.length === 0) {
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

  public useObject(obj: ObjectEntry, qty = 1) {
    if (obj === undefined) {
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

  public dropObject(obj: ObjectEntry, qty = 1) {
    if (obj === undefined) {
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

  public deleteObject(obj: ObjectEntry, qty = 1) {
    if (obj === undefined) {
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
      const e = items.find(f => f.id === obj.objectGID).object;
      const entry = new ObjectEntry(obj, e);
      await sleep(100);
      this._objects.set(obj.objectUID, entry);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectAddedMessage(message: any) {
    const obj = new ObjectEntry(message.object);
    this._objects.set(message.object.objectUID, obj);
    this.onObjectGained.trigger(obj.gid);
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectsAddedMessage(message: any) {
    const items = await DataManager.get<Items>(
      DataTypes.Items,
      ...message.object.map(o => o.objectGID)
    );

    for (const obj of message.object) {
      const e = items.find(f => f.id === obj.objectGID).object;
      const entry = new ObjectEntry(obj, e);
      this._objects.set(obj.objectUID, entry);
    }

    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectDeletedMessage(message: any) {
    this._objects.delete(message.objectUID);
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectsDeletedMessage(message: any) {
    for (const uid of message.objectUID) {
      this._objects.delete(uid);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectModifiedMessage(message: any) {
    const obj = this._objects.get(message.object.objectUID);
    if (obj !== undefined) {
      obj.UpdateObjectItem(message.object);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectMovementMessage(message: any) {
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

  public async UpdateObjectQuantityMessage(message: any) {
    const obj = this._objects.get(message.objectUID);
    if (obj !== undefined) {
      obj.UpdateQuantity(message.quantity);
      this.onObjectGained.trigger(obj.gid);
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateObjectsQuantityMessage(message: any) {
    for (const o of message.objectsUIDAndQty) {
      const obj = this._objects.get(o.objectUID);
      if (obj !== undefined) {
        obj.UpdateQuantity(message.quantity);
        this.onObjectGained.trigger(obj.gid);
      }
    }
    this.onInventoryUpdated.trigger(true);
  }

  public async UpdateInventoryWeightMessage(message: any) {
    this.weight = message.weight;
    this._fallbackMaxWeight = message.weightMax;
    this.resetMaxWeight();
    this.onInventoryUpdated.trigger(false);
  }

  public async UpdateKamasUpdateMessage(message: any) {
    this.kamas = message.kamasTotal;
    this.onInventoryUpdated.trigger(false);
  }

  public async UpdateCharacterStatsListMessage(message: any) {
    this.kamas = message.stats.kamas;
    this.resetMaxWeight();
    this.onInventoryUpdated.trigger(false);
  }

  private resetMaxWeight() {
    try {
      const job = this.account.game.character.jobs.jobs.Sum(j => j.level);
      const jobCount = this.account.game.character.jobs.jobs.Count(
        j => j.level === 100
      );
      const strength = this.totalStat(
        this.account.game.character.stats.strength
      );
      const boost = this.account.game.character.inventory.equipments.Sum(
        e => e.weightBoost
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
