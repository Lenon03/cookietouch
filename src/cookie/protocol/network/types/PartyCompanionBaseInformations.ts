import EntityLook from "./EntityLook";
export default class PartyCompanionBaseInformations {
  public indexId: number;
  public companionGenericId: number;
  public entityLook: EntityLook;
  constructor(indexId = 0, companionGenericId = 0, entityLook: EntityLook = null) {

    this.indexId = indexId;
    this.companionGenericId = companionGenericId;
    this.entityLook = entityLook;

  }
}
