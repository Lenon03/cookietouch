import AlternativeMonstersInGroupLightInformations from "@/protocol/network/types/AlternativeMonstersInGroupLightInformations";
import GroupMonsterStaticInformations from "@/protocol/network/types/GroupMonsterStaticInformations";
import MonsterInGroupInformations from "@/protocol/network/types/MonsterInGroupInformations";
import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";

export default class GroupMonsterStaticInformationsWithAlternatives extends GroupMonsterStaticInformations {
  public alternatives: AlternativeMonstersInGroupLightInformations[];

  constructor(
    mainCreatureLightInfos = new MonsterInGroupLightInformations(),
    underlings: MonsterInGroupInformations[] = [],
    alternatives: AlternativeMonstersInGroupLightInformations[] = []
  ) {
    super(mainCreatureLightInfos, underlings);
    this.alternatives = alternatives;
  }
}
