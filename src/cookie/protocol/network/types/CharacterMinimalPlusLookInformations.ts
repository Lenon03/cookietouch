import CharacterMinimalInformations from "./CharacterMinimalInformations";
import EntityLook from "./EntityLook";

export default class CharacterMinimalPlusLookInformations extends CharacterMinimalInformations {

  public entityLook: EntityLook;

  constructor(id = 0, level = 0, name = "", entityLook: EntityLook) {
    super(id, level, name);
    this.entityLook = entityLook;
  }
}
