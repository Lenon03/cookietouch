import * as fs from "fs";
import * as path from "path";

const content = fs.readFileSync(path.join(__dirname, "../../resources/path.js"));

// console.log(content.toString());

const API = {
  character: {
    kamas() {
      return 300;
    },
  },
};

/* tslint:disable */

console.log("eval: ", eval(content.toString() + ";console.log(config['MAX_PODS'])" + ";move[2].custom()" + ";config['GATHERS']"));
