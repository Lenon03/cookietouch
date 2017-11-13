import { Account } from "../game/Account";
import MovementsManager from "./movements";

export class Managers {
  public movements: MovementsManager;

  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.movements = new MovementsManager(account);
  }
}
