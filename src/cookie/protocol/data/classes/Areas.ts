import Data from "@/protocol/data/Data";

export default class Areas extends Data {
  public _type: string = "";
  public nameId: string = "";
  public superAreaId: number = 0;
  public containHouses: boolean = false;
  public containPaddocks: boolean = false;
  public bounds: any;
}
