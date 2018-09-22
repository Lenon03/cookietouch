import Data from "@/protocol/data/Data";

export default class SoundUi extends Data {
  public _type: string = "";
  public uiName: string = "";
  public openFile: string = "";
  public closeFile: string = "";
  public subElements: object[] = [];
}
