import Data from "../Data";

export default class SubAreas extends Data {
  public nameId: string;
  public areaId: number;
  public ambientSounds: object[];
  public mapIds: number[];
  public bounds: object;
  public shape: number[];
  public customWorldMap: object[];
  public packId: number;
  public level: number;
  public isConquestVillage: boolean;
  public displayOnWorldMap: boolean;
  public monsters: number[];
  public entranceMapIds: number[];
  public exitMapIds: number[];
  public capturable: boolean;
}
