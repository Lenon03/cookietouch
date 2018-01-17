import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import { Languages } from "@/configurations/language/Languages";
import Dictionary from "@/utils/Dictionary";
import * as fs from "fs";
import * as path from "path";

export default class LanguageManager {
  public static Init() {
    const enTxt = fs.readFileSync(path.join(__dirname, "./en.json"));
    const en = JSON.parse(enTxt.toString());
    const frTxt = fs.readFileSync(path.join(__dirname, "./fr.json"));
    const fr = JSON.parse(frTxt.toString());

    this.langs = new Dictionary([
      { key: Languages.FRENCH, value: fr },
      { key: Languages.ENGLISH, value: en },
    ]);
  }

  public static trans(key: string, ...params: any[]): string {
    const lang = GlobalConfiguration.lang;
    let value = this.langs.getValue(lang)[key] as string;
    if (!value) { return ""; }
    if (params.length === 0) {
      return value;
    } else {
      for (const param of params) {
        value = value.replace("?", param);
      }
      return value;
    }
  }

  private static langs: Dictionary<Languages, any>;
}
