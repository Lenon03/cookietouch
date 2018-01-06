import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class EditItemInSalePriceAction extends ScriptAction {
  public uid: number;
  public newPrice: number;

  constructor(uid: number, newPrice: number) {
    super();
    this.uid = uid;
    this.newPrice = newPrice;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const res = await account.game.bid.editItemInSalePrice(this.uid, this.newPrice);
      if (res) {
        await sleep(3000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
