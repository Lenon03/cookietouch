import Data from "@/protocol/data/Data";

export default class Jobs extends Data {
  public nameId: string = "";
  public specializationOfId: number = 0;
  public iconId: number = 0;
  public toolIds: object[] = [];
}
