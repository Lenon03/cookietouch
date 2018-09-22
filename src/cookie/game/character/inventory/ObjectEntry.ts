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
  public static async setup(o: ObjectItem, item?: Items) {
    if (!item) {
      const data = await DataManager.get<Items>(DataTypes.Items, o.objectGID);
      item = data[0].object;
    }

    const data2 = await DataManager.get<ItemTypes>(
      DataTypes.ItemTypes,
      item.typeId
    );

    const type = data2[0].object;

    // Check if this item gives hp back (BOOST_HP 110)
    let regenValue = 0;
    let weightBoost = 0;
    for (const e of o.effects) {
      if (!(e._type === "ObjectEffectInteger")) {
        continue;
      }

      const newE = e as ObjectEffectInteger;

      if (e.actionId === 110) {
        regenValue = newE.value;
      } else if (e.actionId === 158) {
        weightBoost = newE.value;
      }
    }
    return new ObjectEntry(
      o.objectGID,
      o.objectUID,
      o.quantity,
      o.position,
      InventoryHelper.getObjectType(type.superTypeId),
      item.nameId,
      item.iconId,
      item.usable,
      item.exchangeable,
      item.range,
      item.typeId === 20 && item.useAnimationId === 18,
      item.realWeight,
      item.typeId,
      type.superTypeId,
      regenValue,
      weightBoost
    );
  }

  constructor(
    public gid: number,
    public uid: number,
    public quantity: number,
    public position: CharacterInventoryPositionEnum,
    public type: ObjectTypes,
    public name: string,
    public iconId: number,
    public usable: boolean,
    public exchangeable: boolean,
    public range: number,
    public isFishingRod: boolean,
    public realWeight: number,
    public typeId: number,
    public superTypeId: number,
    public regenValue?: number,
    public weightBoost?: number
  ) {}

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
