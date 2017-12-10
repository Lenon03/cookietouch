import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StartExchangeAction extends ScriptAction {
  public playerId: number;

  constructor(playerId: number) {
    super();
    this.playerId = playerId;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.exchange.startExchange(this.playerId)) {
        return ScriptAction.processingResult;
      }
      return ScriptAction.doneResult;
    });
  }
}
