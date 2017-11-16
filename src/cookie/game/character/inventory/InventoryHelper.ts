import { CharacterInventoryPositionEnum } from "../../../protocol/enums/CharacterInventoryPositionEnum";
import Dictionary from "../../../utils/Dictionary";

export enum ObjectTypes { EQUIPMENT, RESOURCES, CONSUMABLE, QUEST_OBJECT, UNKNOWN }

export default class InventoryHelper {
  public static readonly equippableSuperTypeIds = [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 22, 23];

  public static possiblePositions = new Dictionary<number, CharacterInventoryPositionEnum[]>();

  public static Init() {
    this.possiblePositions.add(1, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_AMULET]);
    this.possiblePositions.add(2, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_WEAPON]);
    this.possiblePositions.add(3, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_RING_LEFT,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_RING_RIGHT]);
    this.possiblePositions.add(4, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_BELT]);
    this.possiblePositions.add(5, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_BOOTS]);
    this.possiblePositions.add(7, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_SHIELD]);
    this.possiblePositions.add(8, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_WEAPON]);
    this.possiblePositions.add(10, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_HAT]);
    this.possiblePositions.add(11, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_CAPE]);
    this.possiblePositions.add(12, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_PETS]);
    this.possiblePositions.add(13, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_1,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_2,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_3,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_4,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_5,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_6]);
    this.possiblePositions.add(15, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_MUTATION]);
    this.possiblePositions.add(16, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_BOOST_FOOD]);
    this.possiblePositions.add(17, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_FIRST_BONUS,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_SECOND_BONUS]);
    this.possiblePositions.add(18, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_FIRST_MALUS,
    CharacterInventoryPositionEnum.ACCESSORY_POSITION_SECOND_MALUS]);
    this.possiblePositions.add(19, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_ROLEPLAY_BUFFER]);
    this.possiblePositions.add(20, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_FOLLOWER]);
    this.possiblePositions.add(21, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_MOUNT]);
    this.possiblePositions.add(23, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_COMPANION]);
  }

  public static getObjectType(superTypeId: number): ObjectTypes {
    if (this.equippableSuperTypeIds.includes(superTypeId)) {
      return ObjectTypes.EQUIPMENT;
    }

    switch (superTypeId) {
      case 6:
        return ObjectTypes.CONSUMABLE;
      case 9:
        return ObjectTypes.RESOURCES;
      case 14:
        return ObjectTypes.QUEST_OBJECT;
      default:
        return ObjectTypes.UNKNOWN;
    }
  }

  public static getPossiblePositions(superTypeId: number) {
    return this.possiblePositions.containsKey(superTypeId) ? this.possiblePositions.getValue(superTypeId) : null;
  }
}
