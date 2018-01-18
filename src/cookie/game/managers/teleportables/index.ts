import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import MapGame from "@game/map";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import InteractivesManager from "../interactives";

export enum TeleportablesEnum { ZAAP, ZAAPI, NONE }

export default class TeleportablesManager {
  private _account: Account;
  private _destinationMapId: number;
  private _teleportable: TeleportablesEnum;

  public get UseFinished() { return this.onUseFinished.expose(); }
  private readonly onUseFinished = new LiteEvent<boolean>();

  constructor(account: Account, interactives: InteractivesManager, map: MapGame) {
    this._account = account;
    this._teleportable = TeleportablesEnum.NONE;
    this._account.dispatcher.register("ZaapListMessage", this.HandleZaapListMessage, this);
    this._account.dispatcher.register("TeleportDestinationsListMessage",
      this.HandleTeleportDestinationsListMessage, this);
    map.MapChanged.on((success) => this.mapChanged.bind(this));
    interactives.UseFinished.on((success) => this.interactivesUseFinished.bind(this));
  }

  public saveZaap(): boolean {
    if (this._account.isBusy) {
      this._account.logger.logWarning(LanguageManager.trans("teleportablesManagers"), LanguageManager.trans("characterBusy"));
      return false;
    }

    if (this._account.game.map.zaap === null) {
      this._account.logger.logWarning(LanguageManager.trans("teleportablesManagers"), LanguageManager.trans("noZaap"));
      return false;
    }

    return this._account.game.managers.interactives.moveToUseInteractive(
      this._account.game.map.zaap.element, this._account.game.map.zaap.cellId,
      this._account.game.map.zaap.element.enabledSkills.find((s) => s.id === 44).instanceUid,
    );
  }

  public useZaap(desinationMapId: number): boolean {
    if (this._account.isBusy) {
      this._account.logger.logWarning(LanguageManager.trans("teleportablesManagers"), LanguageManager.trans("characterBusy"));
      return false;
    }

    if (this._account.game.map.zaap === null) {
      this._account.logger.logWarning(LanguageManager.trans("teleportablesManagers"), LanguageManager.trans("noZaap"));
      return false;
    }

    if (!this._account.game.managers.interactives.moveToUseInteractive(this._account.game.map.zaap.element,
      this._account.game.map.zaap.cellId, -1)) {
      return false;
    }

    this._teleportable = TeleportablesEnum.ZAAP;
    this._destinationMapId = desinationMapId;
    return true;
  }

  public useZaapi(desinationMapId: number): boolean {
    if (this._account.isBusy) {
      this._account.logger.logWarning(LanguageManager.trans("teleportablesManagers"), LanguageManager.trans("characterBusy"));
      return false;
    }

    if (this._account.game.map.zaapi === null) {
      this._account.logger.logWarning(LanguageManager.trans("teleportablesManagers"), LanguageManager.trans("noZaapi"));
      return false;
    }

    if (!this._account.game.managers.interactives.moveToUseInteractive(this._account.game.map.zaapi.element,
      this._account.game.map.zaapi.cellId, -1)) {
      return false;
    }

    this._teleportable = TeleportablesEnum.ZAAPI;
    this._destinationMapId = desinationMapId;
    return true;
  }

  public cancel() {
    this._teleportable = TeleportablesEnum.NONE;
    this._destinationMapId = 0;
  }

  private isUseFinished(success: boolean) {
    this.cancel();
    this.onUseFinished.trigger(success);
  }

  private async HandleZaapListMessage(account: Account, message: any) {
    await sleep(1000);

    if (this._teleportable !== TeleportablesEnum.ZAAP || this._destinationMapId === 0) {
      return;
    }

    if (!message.mapIds.includes(this._destinationMapId)) {
      this.isUseFinished(false);
      return;
    }

    await this._account.network.sendMessageFree("TeleportableRequestMessage", {
      mapId: this._destinationMapId,
      teleporterType: this._teleportable,
    });
  }

  private async HandleTeleportDestinationsListMessage(account: Account, message: any) {
    await sleep(1000);

    if (this._teleportable !== TeleportablesEnum.ZAAPI || this._destinationMapId === 0) {
      return;
    }

    if (!message.mapIds.includes(this._destinationMapId)) {
      this.isUseFinished(false);
      return;
    }

    await this._account.network.sendMessageFree("TeleportableRequestMessage", {
      mapId: this._destinationMapId,
      teleporterType: this._teleportable,
    });
  }

  private mapChanged(success: boolean) {
    if (this._teleportable === TeleportablesEnum.NONE || this._destinationMapId === 0) {
      return;
    }

    this.isUseFinished(true);
  }

  private interactivesUseFinished(success: boolean) {
    if (this._teleportable === TeleportablesEnum.NONE || this._destinationMapId === 0) {
      return;
    }

    if (!success) {
      this.isUseFinished(false);
    }
  }
}
