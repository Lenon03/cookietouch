import Type from "./Type";

export default class FightTeamMemberInformations extends Type {

  public id: number;

  constructor(id = 0) {
    super();
    this.id = id;
  }
}
