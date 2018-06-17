import MonsterInGroupInformations from "./MonsterInGroupInformations";
import MonsterInGroupLightInformations from "./MonsterInGroupLightInformations";
import Type from "./Type";

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
