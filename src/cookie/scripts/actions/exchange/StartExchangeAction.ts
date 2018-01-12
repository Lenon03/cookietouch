import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StartExchangeAction extends ScriptAction {
  public playerId: number;

  constructor(playerId: number) {
    super();
    this.playerId = playerId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.exchange.startExchange(this.playerId)) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}
