import FightTeamMemberInformations from "./FightTeamMemberInformations";

export default class FightTeamMemberCharacterInformations extends FightTeamMemberInformations {

  public name: string;
  public level: number;

  constructor(id = 0, name = "", level = 0) {
    super(id);
    this.name = name;
    this.level = level;
  }
}
