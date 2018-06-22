import CharacterMinimalInformations from "@/protocol/network/types/CharacterMinimalInformations";
import EntityLook from "@/protocol/network/types/EntityLook";

export default class CharacterMinimalPlusLookInformations extends CharacterMinimalInformations {

  public entityLook: EntityLook;

  constructor(id = 0, level = 0, name = "", entityLook: EntityLook) {
    super(id, level, name);
    this.entityLook = entityLook;
  }
}
