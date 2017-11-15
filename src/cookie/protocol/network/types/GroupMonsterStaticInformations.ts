import MonsterInGroupInformations from "./MonsterInGroupInformations";
import MonsterInGroupLightInformations from "./MonsterInGroupLightInformations";

export default class GroupMonsterStaticInformations {
  public underlings: MonsterInGroupInformations[];
  public mainCreatureLightInfos: MonsterInGroupLightInformations;

  constructor(mainCreatureLightInfos: MonsterInGroupLightInformations = null,
              underlings: MonsterInGroupInformations[] = null) {
    this.mainCreatureLightInfos = mainCreatureLightInfos;
    this.underlings = underlings;
  }
}
