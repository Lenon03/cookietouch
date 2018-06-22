import Data from "@/protocol/data/Data";

export default class Url extends Data {
  public browserId: number;
  public url: string;
  public param: string;
  public method: string;
}
