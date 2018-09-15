import InventoryHelper, {
  ObjectTypes
} from "@/game/character/inventory/InventoryHelper";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import ItemTypes from "@/protocol/data/classes/ItemTypes";
import { DataTypes } from "@/protocol/data/DataTypes";
import DTConstants from "@/protocol/DTConstants";
import { CharacterInventoryPositionEnum } from "@/protocol/enums/CharacterInventoryPositionEnum";
import ObjectEffectInteger from "@/protocol/network/types/ObjectEffectInteger";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ObjectEntry {
  public gid: number;
  public uid: number;
  public quantity: number;
  public position: CharacterInventoryPositionEnum;
  public type: ObjectTypes;
  public name: string;
  public iconId: number;
  public usable: boolean;
  public exchangeable: boolean;
  public range: number;
  public isFishingRod: boolean;
  public realWeight: number;
  public typeId: number;
  public superTypeId: number;
  public regenValue: number;
  public weightBoost: number;

  public static async setup(o: ObjectItem, item?: Items) {
    const obj = new ObjectEntry();
    obj.gid = o.objectGID;
    obj.uid = o.objectUID;
    obj.quantity = o.quantity;
    obj.position = o.position;

    if (!item) {
      const data = await DataManager.get<Items>(DataTypes.Items, obj.gid);
      item = data[0].object;

      const data2 = await DataManager.get<ItemTypes>(
        DataTypes.ItemTypes,
        item.typeId
      );

      const type = data2[0].object;

      obj.name = item.nameId;
      obj.iconId = item.iconId;
      obj.usable = item.usable;
      obj.exchangeable = item.exchangeable;
      obj.range = item.range;
      obj.isFishingRod = item.typeId === 20 && item.useAnimationId === 18;
      obj.realWeight = item.realWeight;
      obj.typeId = item.typeId;
      obj.superTypeId = type.superTypeId;
      obj.type = InventoryHelper.getObjectType(obj.superTypeId);

      // Check if this item gives hp back (BOOST_HP 110)
      for (const e of o.effects) {
        if (!(e._type === "ObjectEffectInteger")) {
          continue;
        }

        const newE = e as ObjectEffectInteger;

        if (e.actionId === 110) {
          obj.regenValue = newE.value;
        } else if (e.actionId === 158) {
          obj.weightBoost = newE.value;
        }
      }
      return obj;
    }

    const data3 = await DataManager.get<ItemTypes>(
      DataTypes.ItemTypes,
      item.typeId
    );

    const type2 = data3[0].object;

    obj.name = item.nameId;
    obj.iconId = item.iconId;
    obj.usable = item.usable;
    obj.exchangeable = item.exchangeable;
    obj.range = item.range;
    obj.isFishingRod = item.typeId === 20 && item.useAnimationId === 18;
    obj.realWeight = item.realWeight;
    obj.typeId = item.typeId;
    obj.superTypeId = type2.superTypeId;
    obj.type = InventoryHelper.getObjectType(obj.superTypeId);

    // Check if this item gives hp back (BOOST_HP 110)
    for (const e of o.effects) {
      if (!(e._type === "ObjectEffectInteger")) {
        continue;
      }
      const newE = e as ObjectEffectInteger;

      if (e.actionId === 110) {
        obj.regenValue = newE.value;
      } else if (e.actionId === 158) {
        obj.weightBoost = newE.value;
      }
    }

    return obj;
  }

  get iconUrl() {
    return `${DTConstants.config.assetsUrl}/gfx/items/${this.iconId}.png`;
  }

  public async UpdateObjectItem(item: ObjectItem) {
    this.gid = item.objectGID;
    this.uid = item.objectUID;
    this.quantity = item.quantity;
    this.position = item.position;
  }

  public UpdateQuantity(qty: number) {
    this.quantity = qty;
  }

  public UpdateObjectMovementMessage(message: any) {
    this.position = message.position;
  }
}
