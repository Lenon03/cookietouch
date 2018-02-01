import Data from "../Data";

export default class Areas extends Data {
  public _type: string;
  public nameId: string;
  public superAreaId: number;
  public containHouses: boolean;
  public containPaddocks: boolean;
  public bounds: any;
}
