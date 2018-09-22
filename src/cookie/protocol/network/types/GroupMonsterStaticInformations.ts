import MonsterInGroupInformations from "@/protocol/network/types/MonsterInGroupInformations";
import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";
import Type from "@/protocol/network/types/Type";

export default class GroupMonsterStaticInformations extends Type {
  public underlings: MonsterInGroupInformations[];
  public mainCreatureLightInfos: MonsterInGroupLightInformations;

  constructor(
    mainCreatureLightInfos = new MonsterInGroupLightInformations(),
    underlings: MonsterInGroupInformations[] = []
  ) {
    super();
    this.mainCreatureLightInfos = mainCreatureLightInfos;
    this.underlings = underlings;
  }
}
