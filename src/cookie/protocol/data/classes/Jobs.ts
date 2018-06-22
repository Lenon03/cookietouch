import Data from "@/protocol/data/Data";

export default class Jobs extends Data {
  public nameId: string;
  public specializationOfId: number;
  public iconId: number;
  public toolIds: object[];
}
