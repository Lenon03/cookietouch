import AlternativeMonstersInGroupLightInformations from "./AlternativeMonstersInGroupLightInformations";
import GroupMonsterStaticInformations from "./GroupMonsterStaticInformations";
import MonsterInGroupInformations from "./MonsterInGroupInformations";
import MonsterInGroupLightInformations from "./MonsterInGroupLightInformations";

export default class GroupMonsterStaticInformationsWithAlternatives extends GroupMonsterStaticInformations {
  public alternatives: AlternativeMonstersInGroupLightInformations[];

  constructor(mainCreatureLightInfos: MonsterInGroupLightInformations = null,
              underlings: MonsterInGroupInformations[] = null,
              alternatives: AlternativeMonstersInGroupLightInformations[] = null) {
    super(mainCreatureLightInfos, underlings);
    this.alternatives = alternatives;

  }
}
