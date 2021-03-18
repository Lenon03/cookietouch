import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";
import EntityLook from "@/protocol/network/types/EntityLook";

export default class CharacterHardcoreInformations extends CharacterBaseInformations {
  public deathState: number;
  public deathCount: number;
  public deathMaxLevel: number;

  constructor(
    id = 0,
    level = 0,
    name = "",
    entitylook: EntityLook,
    breed = 0,
    sex = false,
    deathState = 0,
    deathCount = 0,
    deathMaxLevel = 0
  ) {
    super(id, level, name, entitylook, breed, sex);
    this.deathState = deathState;
    this.deathCount = deathCount;
    this.deathMaxLevel = deathMaxLevel;
  }
}
