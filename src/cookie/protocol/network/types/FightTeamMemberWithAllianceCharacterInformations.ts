import BasicAllianceInformations from "./BasicAllianceInformations";
import FightTeamMemberCharacterInformations from "./FightTeamMemberCharacterInformations";

export default class FightTeamMemberWithAllianceCharacterInformations extends FightTeamMemberCharacterInformations {

  public allianceInfos: BasicAllianceInformations;

  constructor(id = 0, name = "", level = 0, allianceInfos: BasicAllianceInformations) {
    super(id, name, level);
    this.allianceInfos = allianceInfos;
  }
}
