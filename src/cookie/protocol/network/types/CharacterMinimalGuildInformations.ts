import BasicGuildInformations from "./BasicGuildInformations";
import CharacterMinimalPlusLookInformations from "./CharacterMinimalPlusLookInformations";
import Entitylook from "./EntityLook";

export default class CharacterMinimalGuildInformations extends CharacterMinimalPlusLookInformations {

  public guild: BasicGuildInformations;

  constructor(id = 0, level = 0, name = "", entitylook: Entitylook, guild: BasicGuildInformations ) {
    super(id, level, name, entitylook);
    this.guild = guild;
  }
}
