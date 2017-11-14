import Account from "../game/Account";
import DataManager from "./data";
import MovementsManager from "./movements";

export default class Managers {
  public movements: MovementsManager;
  public data: DataManager;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.movements = new MovementsManager(account);
    this.data = new DataManager(account);
  }
}
