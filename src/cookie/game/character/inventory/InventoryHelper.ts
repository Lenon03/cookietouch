import { CharacterInventoryPositionEnum } from "@/protocol/enums/CharacterInventoryPositionEnum";

export enum ObjectTypes {
  EQUIPMENT,
  RESOURCES,
  CONSUMABLE,
  QUEST_OBJECT,
  UNKNOWN
}

export default class InventoryHelper {
  public static readonly equippableSuperTypeIds = [
    1,
    2,
    3,
    4,
    5,
    7,
    8,
    10,
    11,
    12,
    13,
    22,
    23
  ];

  public static possiblePositions = new Map<
    number,
    CharacterInventoryPositionEnum[]
  >([
    [1, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_AMULET]],
    [2, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_WEAPON]],
    [
      3,
      [
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_RING_LEFT,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_RING_RIGHT
      ]
    ],
    [4, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_BELT]],
    [5, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_BOOTS]],
    [7, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_SHIELD]],
    [8, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_WEAPON]],
    [10, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_HAT]],
    [11, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_CAPE]],
    [12, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_PETS]],
    [
      13,
      [
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_1,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_2,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_3,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_4,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_5,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_DOFUS_6
      ]
    ],
    [15, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_MUTATION]],
    [16, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_BOOST_FOOD]],
    [
      17,
      [
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_FIRST_BONUS,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_SECOND_BONUS
      ]
    ],
    [
      18,
      [
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_FIRST_MALUS,
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_SECOND_MALUS
      ]
    ],
    [19, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_ROLEPLAY_BUFFER]],
    [20, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_FOLLOWER]],
    [21, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_MOUNT]],
    [23, [CharacterInventoryPositionEnum.ACCESSORY_POSITION_COMPANION]]
  ]);

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
    return this.possiblePositions.has(superTypeId)
      ? this.possiblePositions.get(superTypeId)
      : null;
  }
}
