import Data from "../Data";

export default class Areas extends Data {
  public nameId: string;
  public superAreaId: number;
  public containHouses: boolean;
  public containPaddocks: boolean;
  public bounds: object;
}
