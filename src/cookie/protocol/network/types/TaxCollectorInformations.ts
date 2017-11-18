import AdditionalTaxCollectorInformations from "./AdditionalTaxCollectorInformations";
import EntityLook from "./EntityLook";
import TaxCollectorComplementaryInformations from "./TaxCollectorComplementaryInformations";
export default class TaxCollectorInformations {
  public complements: TaxCollectorComplementaryInformations[];
  public uniqueId: number;
  public firtNameId: number;
  public lastNameId: number;
  public additionalInfos: AdditionalTaxCollectorInformations;
  public worldX: number;
  public worldY: number;
  public subAreaId: number;
  public state: number;
  public look: EntityLook;
  constructor(uniqueId = 0, firtNameId = 0, lastNameId = 0, additionalInfos: AdditionalTaxCollectorInformations = null,
              worldX = 0, worldY = 0, subAreaId = 0, state = 0, look: EntityLook = null,
              complements: TaxCollectorComplementaryInformations[] = null) {

    this.complements = complements;
    this.uniqueId = uniqueId;
    this.firtNameId = firtNameId;
    this.lastNameId = lastNameId;
    this.additionalInfos = additionalInfos;
    this.worldX = worldX;
    this.worldY = worldY;
    this.subAreaId = subAreaId;
    this.state = state;
    this.look = look;

  }
}
