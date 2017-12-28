import BasicAllianceInformations from "./BasicAllianceInformations";
import BasicGuildInformations from "./BasicGuildInformations";
import CharacterMinimalGuildInformations from "./CharacterMinimalGuildInformations";
import Entitylook from "./EntityLook";

export default class CharacterMinimalAllianceInformations extends CharacterMinimalGuildInformations {

  public alliance: BasicAllianceInformations;

  constructor(id = 0, level = 0, name = "", entitylook: Entitylook, guild: BasicGuildInformations,
              alliance: BasicAllianceInformations ) {
    super(id, level, name, entitylook, guild);
    this.alliance = alliance;
  }
}
