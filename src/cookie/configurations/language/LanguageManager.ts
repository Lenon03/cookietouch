import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import { Languages } from "@/configurations/language/Languages";
import Dictionary from "@/utils/Dictionary";
import * as fs from "fs";
import * as path from "path";

/* tslint:disable */
const en = require("./langs/en.json");
const fr = require("./langs/fr.json");
const de = require("./langs/de.json");
const es = require("./langs/es.json");
const it = require("./langs/it.json");
const pt = require("./langs/pt.json");
/* tslint:enable */

export default class LanguageManager {

  public static trans(key: string, ...params: any[]): string {
    const lang = GlobalConfiguration.lang;
    let value = this.langs.getValue(lang)[key] as string;
    if (!value) {
      value = this.langs.getValue(Languages.ENGLISH)[key] as string;
      if (!value) { return "<empty>"; }
    }
    if (params.length === 0) {
      return value;
    } else {
      for (const param of params) {
        value = value.replace("?", param);
      }
      return value;
    }
  }

  private static langs: Dictionary<Languages, any> = new Dictionary([
    { key: Languages.FRENCH, value: fr },
    { key: Languages.ENGLISH, value: en },
    { key: Languages.DEUTSCH, value: de },
    { key: Languages.ITALIAN, value: it },
    { key: Languages.PORTUGUESE, value: pt },
    { key: Languages.SPANISH, value: es },
  ]);
}
