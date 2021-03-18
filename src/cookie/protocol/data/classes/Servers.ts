import Data from "@/protocol/data/Data";

export default class Servers extends Data {
  public nameId: string = "";
  public commentId: string = "";
  public openingDate: number = 0;
  public language: string = "";
  public populationId: number = 0;
  public gameTypeId: number = 0;
  public communityId: number = 0;
  public restrictedToLanguages: object[] = [];
}
