import AdditionalTaxCollectorInformations from "@/protocol/network/types/AdditionalTaxCollectorInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import TaxCollectorComplementaryInformations from "@/protocol/network/types/TaxCollectorComplementaryInformations";
import Type from "@/protocol/network/types/Type";

export default class TaxCollectorInformations extends Type {
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

  constructor(
    uniqueId = 0,
    firtNameId = 0,
    lastNameId = 0,
    additionalInfos = new AdditionalTaxCollectorInformations(),
    worldX = 0,
    worldY = 0,
    subAreaId = 0,
    state = 0,
    look = new EntityLook(),
    complements: TaxCollectorComplementaryInformations[] = []
  ) {
    super();
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
