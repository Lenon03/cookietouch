import FightTeamMemberInformations from "./FightTeamMemberInformations";

export default class FightTeamMemberMonsterInformations extends FightTeamMemberInformations {

  public monsterId: number;
  public grade: number;

  constructor(id = 0, monsterId = 0, grade = 0) {
    super(id);
    this.monsterId = monsterId;
    this.grade = grade;
  }
}
