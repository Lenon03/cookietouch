import Account from "@/account";
import FloodSentence from "@/extensions/flood/FloodSentence";
import { remote } from "electron";
import * as fs from "fs";
import { List } from "linqts";
import * as path from "path";

interface IFloodConfigurationJSON {
  seekChannelInterval: number;
  salesChannelInterval: number;
  generalChannelInterval: number;
  sentences: FloodSentence[];
}

export default class FloodConfiguration {

  public readonly configurationsPath = "parameters/flood";

  public seekChannelInterval: number;
  public salesChannelInterval: number;
  public generalChannelInterval: number;
  public sentences: List<FloodSentence>;

  private account: Account;
  private configFilePath = "";

  constructor(account: Account) {
    this.account = account;
    this.seekChannelInterval = 60;
    this.salesChannelInterval = 120;
    this.generalChannelInterval = 30;
    this.sentences = new List();
  }

  public setConfigFilePath() {
    const folderPath = path.join(remote.app.getPath("userData"), this.configurationsPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    this.configFilePath = path.join(folderPath, `${this.account.accountConfig.username}_${this.account.game.character.name}.config`);
  }

  public load() {
    if (!fs.existsSync(this.configFilePath)) {
      return;
    }
    const data = fs.readFileSync(this.configFilePath);
    const json = JSON.parse(data.toString()) as IFloodConfigurationJSON;
    this.seekChannelInterval = json.seekChannelInterval;
    this.salesChannelInterval = json.salesChannelInterval;
    this.generalChannelInterval = json.generalChannelInterval;
    this.sentences = new List(json.sentences);
  }

  public save() {
    const toSave: IFloodConfigurationJSON = {
      generalChannelInterval: this.generalChannelInterval,
      salesChannelInterval: this.salesChannelInterval,
      seekChannelInterval: this.seekChannelInterval,
      sentences: this.sentences.ToArray(),
    };
    fs.writeFileSync(this.configFilePath, JSON.stringify(toSave));
  }
}
