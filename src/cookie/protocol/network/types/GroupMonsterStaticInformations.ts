import MonsterInGroupInformations from "@/protocol/network/types/MonsterInGroupInformations";
import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";
import Type from "@/protocol/network/types/Type";

export default class GroupMonsterStaticInformations extends Type {
  public underlings: MonsterInGroupInformations[];
  public mainCreatureLightInfos: MonsterInGroupLightInformations;

  constructor(mainCreatureLightInfos: MonsterInGroupLightInformations = null,
              underlings: MonsterInGroupInformations[] = null) {
    super();
    this.mainCreatureLightInfos = mainCreatureLightInfos;
    this.underlings = underlings;
  }
}
