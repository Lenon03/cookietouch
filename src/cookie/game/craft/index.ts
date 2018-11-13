import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import NpcEntry from "@/game/map/entities/NpcEntry";
import LiteEvent from "@/utils/LiteEvent";
// import ExchangeStartOkNpcShopMessage from "@/protocol/network/messages/ExchangeStartOkNpcShopMessage";
import ObjectItemToSellInNpcShop from "@/protocol/network/types/ObjectItemToSellInNpcShop";
/* import { Deferred, IDeferred } from "@/utils/Deferred";
import { List } from "linqts";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import { DataTypes } from "@/protocol/data/DataTypes";*/

export default class Craft {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public setRecipe(guid: number): boolean {
    this.account.network.sendMessageFree("ExchangeSetCraftRecipeMessage", {
      objectGID: guid,

    });
    return true;
  }

  public ready(): boolean {
    this.account.network.sendMessageFree("ExchangeReadyMessage", {
      ready: true,
      step: 2
    });
    return true;
  }

}