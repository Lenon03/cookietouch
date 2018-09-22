import Data from "@/protocol/data/Data";

export default class SubAreas extends Data {
  public _type: string = "";
  public nameId: string = "";
  public areaId: number = 0;
  public ambientSounds: any[] = [];
  public mapIds: number[] = [];
  public bounds: any;
  public shape: number[] = [];
  public customWorldMap: object[] = [];
  public packId: number = 0;
  public level: number = 0;
  public isConquestVillage: boolean = false;
  public displayOnWorldMap: boolean = false;
  public monsters: number[] = [];
  public entranceMapIds: object[] = [];
  public exitMapIds: object[] = [];
  public capturable: boolean = false;
}
