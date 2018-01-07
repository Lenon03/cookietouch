import * as fs from "fs";

export default class JsonScriptManager {

  public script: any;

  constructor() {
    //
  }

  public loadFromFile(filePath: string) {
    const content = fs.readFileSync(filePath);
    console.log(content);
  }
}
