import Account from "@/account";
import { FunctionTypes } from "@/scripts/FunctionTypes";
import * as fs from "fs";
import * as path from "path";

export interface IBankItem {
  id: number;
  quantity: number;
}

export interface IAutoRegen {
  items: number[];
  store: number;
  minLife: number;
  maxLife: number;
}

export interface IConfig {
  DISPLAY_FIGHT_COUNT: boolean;
  DISPLAY_GATHER_COUNT: boolean;
  MAX_PODS: number;
  AUTO_DELETE: number[];
  AUTO_REGEN: IAutoRegen;
  OPEN_BAGS: boolean;
  ELEMENTS_TO_GATHER: number[];
  MIN_MONSTERS: number;
  MAX_MONSTERS: number;
  MAX_FIGHTS_PER_MAP: number;
  MIN_MONSTERS_LEVEL: number;
  MAX_MONSTERS_LEVEL: number;
  FORBIDDEN_MONSTERS: number[];
  MANDATORY_MONSTERS: number[];
  BANK_PUT_ITEMS: IBankItem[];
  BANK_GET_ITEMS: IBankItem[];
  BANK_PUT_KAMAS: number;
  BANK_GET_KAMAS: number;
}

export interface IMap {
  map: number|string;
  direction: string;
  gather: boolean;
  fight: boolean;
  npcBank: boolean;
  phenix: number;
  door: number;
  custom: GeneratorFunction;
}
export interface IFunc {
  maps: IMap[];
}
export default class JsonScriptManager {

  public script: string = "";
  private username: string;

  public get config(): IConfig {
    return eval(`${this.script};config`);
  }

  public loadFromFile(filePath: string, username: string, beforeDoFile: () => void) {
    this.script = "";
    this.username = username;
    const content = fs.readFileSync(filePath);
    this.regexYield();
    beforeDoFile();
    this.script += fs.readFileSync(path.join(__dirname, "./utils.js")) + content.toString();
    this.regexAll();
  }

  public getFunctionEntries(func: FunctionTypes): IFunc {
    switch (func) {
      case FunctionTypes.MOVE:
        return this.getFunc("move");
      case FunctionTypes.BANK:
        return this.getFunc("bank");
      case FunctionTypes.PHENIX:
        return this.getFunc("phenix");
      default:
        return null;
    }
  }

  private getFunc(name: string): IFunc {
    return {
      maps: eval(`${this.script};${name}`),
    };
  }

  private regexYield() {
    // const regex = /execute/g;
    // this.script = this.script.replace(regex, "yield*");
  }

  private regexAll() {
    // API
    const regexAPI = /API/g;
    this.script = this.script.replace(regexAPI, `API["${this.username}"]`);
    // console.log(this.script);
  }
}
