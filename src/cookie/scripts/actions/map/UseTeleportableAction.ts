import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import { TeleportablesEnum } from "@/game/managers/teleportables";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";

export default class UseTeleportableAction extends ScriptAction {
  public _name: string = "UseTeleportableAction";
  public type: TeleportablesEnum;
  public destinationMapId: number;

  constructor(type: TeleportablesEnum, destinationMapId: number) {
    super();
    this.type = type;
    this.destinationMapId = destinationMapId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (
      (this.type !== TeleportablesEnum.ZAAP ||
        account.game.managers.teleportables.useZaap(this.destinationMapId)) &&
      (this.type !== TeleportablesEnum.ZAAPI ||
        account.game.managers.teleportables.useZaapi(this.destinationMapId))
    ) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(
      LanguageManager.trans("errorTeleportable", TeleportablesEnum[this.type])
    );
    return ScriptAction.failedResult();
  }
}
