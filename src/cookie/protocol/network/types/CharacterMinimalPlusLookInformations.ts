import CharacterMinimalInformations from "./CharacterMinimalInformations";
import EntityLook from "./EntityLook";

export default class CharacterMinimalPlusLookInformations extends CharacterMinimalInformations {

  public entitylook: EntityLook;

  constructor(id = 0, level = 0, name = "", entitylook: EntityLook) {
    super(id, level, name);
    this.entitylook = entitylook;
  }
}
