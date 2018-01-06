import Account from "@account";
import LiteEvent from "@utils/LiteEvent";
import { List } from "linqts";
import API from "./api";
import { IFlag } from "./flags/IFlag";
import { FunctionTypes } from "./FunctionTypes";
import ActionsManager, { IActionsManagerEventData } from "./managers/ActionsManager";
import JsonScriptManager from "./managers/JsonScriptManager";

export default class ScriptsManager {
  public actionsManager: ActionsManager;
  public currentScriptName: string;
  public enabled: boolean;
  public paused: boolean;

  get running(): boolean {
    return this.account.isGroupChief === true ? this.enabled && !this.paused : this.account.group.chief.scripts.running === true;
  }

  get scriptManager(): JsonScriptManager {
    return this.account.isGroupChief ? this._scriptManager : this.account.group.chief.scripts._scriptManager;
  }

  get currentFunctionType(): FunctionTypes {
    return this.account.isGroupChief ? this._currentFunctionType : this.account.group.chief.scripts._currentFunctionType;
  }

  set currentFunctionType(type: FunctionTypes) {
    if (this.account.isGroupChief) {
      this._currentFunctionType = type;
    } else {
      this.account.group.chief.scripts._currentFunctionType = type;
    }
  }

  public get ScriptLoaded() { return this.onScriptLoaded.expose(); }
  private readonly onScriptLoaded = new LiteEvent<string>();
  public get ScriptStarted() { return this.onScriptStarted.expose(); }
  private readonly onScriptStarted = new LiteEvent<any>();
  public get ScriptStopped() { return this.onScriptStopped.expose(); }
  private readonly onScriptStopped = new LiteEvent<string>();

  private account: Account;
  private api: API;
  private _currentFunctionType: FunctionTypes;
  private entryFlags: List<IFlag>;
  private entryFlagsIndex: number;
  private _scriptManager: JsonScriptManager;

  constructor(account: Account) {
    this.account = account;
    this._scriptManager = new JsonScriptManager();
    this.actionsManager = new ActionsManager(account);
    this.entryFlags = new List<IFlag>();
    this.api = new API(account);

    this.account.game.fight.FightJoined.on(this.onFightJoined.bind(this));
    this.account.game.fight.FightEnded.on(this.onFightEnded.bind(this));
    this.actionsManager.ActionsFinished.on(this.onActionsFinished.bind(this));
    this.actionsManager.CustomHandled.on(this.onCustomHandled.bind(this));
  }

  public fromFile(filePath: string) {
    if (this.enabled) {
      this.account.logger.logError("Script", "Can't start multiple script a the same time");
      return;
    }
  }

  public async applyCheckings() {
    // TODO: :)
  }

  public startScript() {
    // TODO: :)
  }

  public stopScript(reason: string = "") {
    // TODO: :)
  }

  private onFightJoined() {
    // TODO: :)
  }

  private onFightEnded() {
    // TODO: :)
  }

  private onActionsFinished(data: IActionsManagerEventData) {
    // TODO: :)
  }

  private onCustomHandled(data: IActionsManagerEventData) {
    // TODO: :)
  }
}
