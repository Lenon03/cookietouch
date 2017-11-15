import SubEntity from "./SubEntity";

export default class EntityLook {
  public skins: number[];
  public indexedColors: number[];
  public scales: number[];
  public subEntities: SubEntity[];
  public bonesId: number;

  constructor(bonesId = 0, skins: number[] = null, indexedColors: number[] = null,
              scales: number[] = null, subEntities: SubEntity[] = null) {
    this.bonesId = bonesId;
    this.skins = skins;
    this.indexedColors = indexedColors;
    this.scales = scales;
    this.subEntities = subEntities;
  }
}
