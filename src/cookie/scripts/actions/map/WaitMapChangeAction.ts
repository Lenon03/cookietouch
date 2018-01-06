import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class WaitMapChangeAction extends ScriptAction {
  public delay: number;

  constructor(delay: number) {
    super();
    this.delay = delay;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      account.logger.logDebug("WaitMapChangeAction", "waiting...");
      let mapChanged = false;
      const map_mapChanged = () => {
        mapChanged = true;
      };
      account.game.map.MapChanged.on(map_mapChanged);
      let delay = 0;
      while (!mapChanged && delay < this.delay && account.scripts.running) {
        await sleep(100);
        delay += 100;
      }
      account.game.map.MapChanged.off(map_mapChanged);
      if (!mapChanged && delay === this.delay) {
        account.logger.logWarning("", "WaitMapChange timed out.");
      }
      account.logger.logDebug("WaitMapChangeAction", "waited");
      return resolve(ScriptActionResults.DONE);
    });
  }
}
