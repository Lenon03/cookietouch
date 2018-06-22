import EntityLook from "@/protocol/network/types/EntityLook";
import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";

export default class MonsterInGroupInformations extends MonsterInGroupLightInformations {
  public look: EntityLook;

  constructor(creatureGenericId = 0, grade = 0, look: EntityLook = null) {
    super(creatureGenericId, grade);
    this.look = look;
  }
}
