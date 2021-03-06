import DataManager from "@protocol/data";
import Items from "@protocol/data/classes/Items";
import ItemTypes from "@protocol/data/classes/ItemTypes";
import DTConstants from "@protocol/DTConstants";
import { CharacterInventoryPositionEnum } from "@protocol/enums/CharacterInventoryPositionEnum";
import ObjectEffectInteger from "@protocol/network/types/ObjectEffectInteger";
import ObjectItem from "@protocol/network/types/ObjectItem";
import InventoryHelper, { ObjectTypes } from "./InventoryHelper";

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

  get iconUrl() {
    return `${DTConstants.config.assetsUrl}/gfx/items/${this.iconId}.png`;
  }

  constructor(o: ObjectItem, item: Items = null) {
    this.gid = o.objectGID;
    this.uid = o.objectUID;
    this.quantity = o.quantity;
    this.position = o.position;

    if (item === null) {
      DataManager.get(Items, this.gid).then((data) => {
        item = data[0].object;

        DataManager.get(ItemTypes, item.typeId).then((data2) => {
          const type = data2[0].object;

          this.name = item.nameId;
          this.iconId = item.iconId;
          this.usable = item.usable;
          this.exchangeable = item.exchangeable;
          this.range = item.range;
          this.isFishingRod = item.typeId === 20 && item.useAnimationId === 18;
          this.realWeight = item.realWeight;
          this.typeId = item.typeId;
          this.superTypeId = type.superTypeId;
          this.type = InventoryHelper.getObjectType(this.superTypeId);

          // Check if this item gives hp back (BOOST_HP 110)
          for (const e of o.effects) {
            if (!(e instanceof ObjectEffectInteger)) {
              continue;
            }

            if (e.actionId === 110) {
              this.regenValue = e.value;
            } else if (e.actionId === 158) {
              this.weightBoost = e.value;
            }
          }
        });
      });
      return;
    }

    DataManager.get(ItemTypes, item.typeId).then((data) => {
      const type = data[0].object;

      this.name = item.nameId;
      this.iconId = item.iconId;
      this.usable = item.usable;
      this.exchangeable = item.exchangeable;
      this.range = item.range;
      this.isFishingRod = item.typeId === 20 && item.useAnimationId === 18;
      this.realWeight = item.realWeight;
      this.typeId = item.typeId;
      this.superTypeId = type.superTypeId;
      this.type = InventoryHelper.getObjectType(this.superTypeId);

      // Check if this item gives hp back (BOOST_HP 110)
      for (const e of o.effects) {
        if (!(e instanceof ObjectEffectInteger)) {
          continue;
        }

        if (e.actionId === 110) {
          this.regenValue = e.value;
        } else if (e.actionId === 158) {
          this.weightBoost = e.value;
        }
      }
    });
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
