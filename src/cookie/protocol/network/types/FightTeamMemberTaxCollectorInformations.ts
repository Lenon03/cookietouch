import FightTeamMemberInformations from "./FightTeamMemberInformations";
export default class FightTeamMemberTaxCollectorInformations extends FightTeamMemberInformations {

  public firstNameDd: number;
  public lastNameId: number;
  public level: number;
  public guildId: number;
  public uid: number;

  constructor(id = 0, firstNameDd = 0, lastNameId = 0, level = 0, guildId = 0, uid = 0) {
    super(id);
    this.firstNameDd = firstNameDd;
    this.lastNameId = lastNameId;
    this.level = level;
    this.guildId = guildId;
    this.uid = uid;
  }
}
