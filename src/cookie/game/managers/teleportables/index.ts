import Account from "@account";
import LiteEvent from "@utils/LiteEvent";

export enum TeleportablesEnum { ZAAP, ZAAPI, NONE }

export default class TeleportablesManager {
  private account: Account;
  private destinationMapId: number;
  private teleportable: TeleportablesEnum;

  constructor(account: Account) {
    this.account = account;
    this.teleportable = TeleportablesEnum.NONE;
  }
}
