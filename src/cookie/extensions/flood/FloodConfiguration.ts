import Account from "@/account";
import FloodSentence from "@/extensions/flood/FloodSentence";
import { List } from "linqts";

export default class FloodConfiguration {

  public seekChannelInterval: number;
  public salesChannelInterval: number;
  public generalChannelInterval: number;
  public sentences: List<FloodSentence>;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.seekChannelInterval = 60;
    this.salesChannelInterval = 120;
    this.generalChannelInterval = 30;
    this.sentences = new List();
  }
}
