import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";
import Type from "@/protocol/network/types/Type";

export default class AlternativeMonstersInGroupLightInformations extends Type {

  public monsters: MonsterInGroupLightInformations[];
  public playercount: number;

  constructor(playercount = 0, monsters: MonsterInGroupLightInformations[]) {
    super();
    this.monsters = monsters;
    this.playercount = playercount;
  }
}
