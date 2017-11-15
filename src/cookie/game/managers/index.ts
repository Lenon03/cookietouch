import Account from "../../Account";
import DataManager from "../../protocol/data";
import MovementsManager from "./movements";

export default class Managers {
  public movements: MovementsManager;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.movements = new MovementsManager(account);
    DataManager.init(account);
  }
}
