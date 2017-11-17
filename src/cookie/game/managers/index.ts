import Account from "@account";
import IClearable from "@utils/IClearable";
import MovementsManager from "./movements";

export default class Managers implements IClearable {
  public movements: MovementsManager;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.movements = new MovementsManager(account);
  }

  public clear() {
    this.movements.clear();
  }

}
