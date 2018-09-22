import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import CharacterMinimalPlusLookInformations from "@/protocol/network/types/CharacterMinimalPlusLookInformations";
import Entitylook from "@/protocol/network/types/EntityLook";

export default class CharacterMinimalGuildInformations extends CharacterMinimalPlusLookInformations {
  public guild: BasicGuildInformations;

  constructor(
    id = 0,
    level = 0,
    name = "",
    entitylook: Entitylook,
    guild: BasicGuildInformations
  ) {
    super(id, level, name, entitylook);
    this.guild = guild;
  }
}
