import SubEntity from "@/protocol/network/types/SubEntity";
import Type from "@/protocol/network/types/Type";

export default class EntityLook extends Type {
  public skins: number[];
  public indexedColors: number[];
  public scales: number[];
  public subEntities: SubEntity[];
  public bonesId: number;

  constructor(
    bonesId = 0,
    skins: number[] = [],
    indexedColors: number[] = [],
    scales: number[] = [],
    subEntities: SubEntity[] = []
  ) {
    super();
    this.bonesId = bonesId;
    this.skins = skins;
    this.indexedColors = indexedColors;
    this.scales = scales;
    this.subEntities = subEntities;
  }
}
