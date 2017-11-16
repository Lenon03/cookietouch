import CharacterMinimalPlusLookInformations from "./CharacterMinimalPlusLookInformations";
import EntityLook from "./EntityLook";

export default class CharacterBaseInformations extends CharacterMinimalPlusLookInformations {

  public breed: number;
  public sex: boolean;

  constructor(id = 0, level = 0, name = "", entitylook: EntityLook, breed = 0, sex = false) {
    super(id, level, name, entitylook);
    this.breed = breed;
    this.sex = sex;
  }
}
