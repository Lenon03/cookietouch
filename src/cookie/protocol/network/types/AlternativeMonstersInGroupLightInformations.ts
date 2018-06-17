import MonsterInGroupLightInformations from "./MonsterInGroupLightInformations";
import Type from "./Type";

export default class AlternativeMonstersInGroupLightInformations extends Type {

  public monsters: MonsterInGroupLightInformations[];
  public playercount: number;

  constructor(playercount = 0, monsters: MonsterInGroupLightInformations[]) {
    super();
    this.monsters = monsters;
    this.playercount = playercount;
  }
}
