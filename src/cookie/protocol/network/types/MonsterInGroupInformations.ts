import EntityLook from "./EntityLook";
import MonsterInGroupLightInformations from "./MonsterInGroupLightInformations";

export default class MonsterInGroupInformations extends MonsterInGroupLightInformations {
  public look: EntityLook;

  constructor(creatureGenericId = 0, grade = 0, look: EntityLook = null) {
    super(creatureGenericId, grade);
    this.look = look;
  }
}
