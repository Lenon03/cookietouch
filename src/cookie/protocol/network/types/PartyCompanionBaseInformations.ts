import EntityLook from "./EntityLook";
import Type from "./Type";

export default class PartyCompanionBaseInformations extends Type {
  public indexId: number;
  public companionGenericId: number;
  public entityLook: EntityLook;
  constructor(indexId = 0, companionGenericId = 0, entityLook: EntityLook = null) {
    super();
    this.indexId = indexId;
    this.companionGenericId = companionGenericId;
    this.entityLook = entityLook;
  }
}
