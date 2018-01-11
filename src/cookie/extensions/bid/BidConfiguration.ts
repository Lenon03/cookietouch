import Account from "@/account";
import ObjectToSellEntry from "@/extensions/bid/ObjectToSellEntry";
import { isBlank } from "@/utils/String";
import { List } from "linqts";

export default class BidConfiguration {

  public interval: number;
  public scriptPath: string;
  public objectsToSell: List<ObjectToSellEntry>;

  get isScriptPathValid(): boolean {
    return !isBlank(this.scriptPath);
  }

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.interval = 10;
    this.objectsToSell = new List();
  }
}
