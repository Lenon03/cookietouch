import AlternativeMonstersInGroupLightInformations from "@/protocol/network/types/AlternativeMonstersInGroupLightInformations";
import GroupMonsterStaticInformations from "@/protocol/network/types/GroupMonsterStaticInformations";
import MonsterInGroupInformations from "@/protocol/network/types/MonsterInGroupInformations";
import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";

export default class GroupMonsterStaticInformationsWithAlternatives extends GroupMonsterStaticInformations {
  public alternatives: AlternativeMonstersInGroupLightInformations[];

  constructor(mainCreatureLightInfos: MonsterInGroupLightInformations = null,
              underlings: MonsterInGroupInformations[] = null,
              alternatives: AlternativeMonstersInGroupLightInformations[] = null) {
    super(mainCreatureLightInfos, underlings);
    this.alternatives = alternatives;

  }
}
