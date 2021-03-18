import FightTeamMemberInformations from "@/protocol/network/types/FightTeamMemberInformations";

export default class FightTeamMemberCompanionInformations extends FightTeamMemberInformations {

  public companionId: number;
  public level: number;
  public masterId: number;

  constructor(id = 0, companionId = 0, level = 0, masterId = 0) {
    super(id);
    this.companionId = companionId;
    this.level = level;
    this.masterId = masterId;
  }
}
