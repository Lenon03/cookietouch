import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StorageGetAutoRegenStoreAction extends ScriptAction {
  public _name: string = "StorageGetAutoRegenStoreAction";
  public items: number[];
  public store: number;

  constructor(items: number[], store: number) {
    super();
    this.items = items;
    this.store = store;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    let store = this.store;
    for (let i = 0; i < this.items.length && store > 0; i++) {
      // We'll have to get the items manually instead of using Storage.GetItem()
      const obj = account.game.storage.objects.FirstOrDefault(
        o => o.gid === this.items[i]
      );
      if (!obj) {
        continue;
      }
      // Get the quantity we can actually take
      const validQty = Math.min(store, obj.quantity);
      if (!account.game.storage.getItem(this.items[i], validQty)) {
        continue;
      }
      store -= validQty;
      await sleep(800);
    }
    if (store > 0) {
      account.logger.logWarning(
        LanguageManager.trans("scripts"),
        LanguageManager.trans("errorAutoRegen")
      );
    }
    return ScriptActionResults.DONE;
  }
}
