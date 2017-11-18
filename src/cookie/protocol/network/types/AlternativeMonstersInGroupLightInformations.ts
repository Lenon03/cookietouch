import MonsterInGroupLightInformations from "./MonsterInGroupLightInformations";

export default class AlternativeMonstersInGroupLightInformations {

  public monsters: MonsterInGroupLightInformations[];
  public playercount: number;

  constructor(playercount = 0, monsters: MonsterInGroupLightInformations[]) {
    this.monsters = monsters;
    this.playercount = playercount;
  }
}
