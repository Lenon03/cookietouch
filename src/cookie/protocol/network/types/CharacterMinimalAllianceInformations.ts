import BasicAllianceInformations from "@/protocol/network/types/BasicAllianceInformations";
import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import CharacterMinimalGuildInformations from "@/protocol/network/types/CharacterMinimalGuildInformations";
import Entitylook from "@/protocol/network/types/EntityLook";

export default class CharacterMinimalAllianceInformations extends CharacterMinimalGuildInformations {

  public alliance: BasicAllianceInformations;

  constructor(id = 0, level = 0, name = "", entitylook: Entitylook, guild: BasicGuildInformations,
              alliance: BasicAllianceInformations) {
    super(id, level, name, entitylook, guild);
    this.alliance = alliance;
  }
}
