import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class WaitMapChangeAction extends ScriptAction {
  public _name: string = "WaitMapChangeAction";
  public delay: number;

  constructor(delay: number) {
    super();
    this.delay = delay;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    account.logger.logDebug(
      LanguageManager.trans("waitMapChangeAction"),
      LanguageManager.trans("waiting")
    );
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
      account.logger.logWarning(
        LanguageManager.trans("waitMapChangeAction"),
        LanguageManager.trans("waitMapChangeTimeout")
      );
    }
    account.logger.logDebug(
      LanguageManager.trans("waitMapChangeAction"),
      LanguageManager.trans("waited")
    );
    return ScriptActionResults.DONE;
  }
}
