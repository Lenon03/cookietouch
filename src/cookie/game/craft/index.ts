import Account from "@/account";
// import { AccountStates } from "@/account/AccountStates";
import LiteEvent from "@/utils/LiteEvent";
import ExchangeObjectAddedMessage from "@/protocol/network/messages/ExchangeObjectAddedMessage";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";
import ExchangeReplayCountModifiedMessage from "@/protocol/network/messages/ExchangeReplayCountModifiedMessage";
import ExchangeStartOkCraftWithInformationMessage from "@/protocol/network/messages/ExchangeStartOkCraftWithInformationMessage";
export default class Craft {

  public remoteObjects: ObjectEntry[];
  public objects: ObjectEntry[];
  public objectsInfos: ObjectItemToSell[];
  public remoteCurrentWeight: number = 0;
  public currentWeight: number = 0;
  public nbcase: number = 0;
  public skillid: number = 0;
  private account: Account;
  private readonly onCraftStarted = new LiteEvent<void>();
  private readonly onCraftLeft = new LiteEvent<void>();
  private readonly onCraftQuantityChanged = new LiteEvent<void>();
  constructor(account: Account) {
    this.account = account;
    this.objectsInfos = [];
    this.remoteObjects = [];
    this.objects = [];
  }
  public get CraftStarted() {
    return this.onCraftStarted.expose();
  }
  public get CraftLeft() {
    return this.onCraftLeft.expose();
  }
  public get CraftQuantityChanged() {
    return this.onCraftQuantityChanged.expose();
  }
  public setRecipe(guid: number): boolean {
    this.account.network.sendMessageFree("ExchangeSetCraftRecipeMessage", {
      objectGID: guid,

    });
    return true;
  }
  public setQuantity(count: number): boolean {
    this.account.network.sendMessageFree("ExchangeReplayMessage", {
      count: count,
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

  public async UpdateExchangeObjectAddedMessage(
    message: ExchangeObjectAddedMessage
  ) {
    const newObj = await ObjectEntry.setup(message.object);
    if (message.remote) {
      this.remoteObjects.push(newObj);
      this.remoteCurrentWeight += newObj.realWeight * newObj.quantity;
    } else {
      this.objects.push(newObj);
      this.currentWeight += newObj.realWeight * newObj.quantity;
    }
    this.onCraftStarted.trigger();
    console.log("debug objectAddedMessage");

  }
  public async UpdateExchangeReplayCountModifiedMessage(
    message: ExchangeReplayCountModifiedMessage
  ) {
    this.onCraftQuantityChanged.trigger();
  }

  public async UpdateExchangeStartOkCraftWithInformationMessage(
    message: ExchangeStartOkCraftWithInformationMessage
  ) {
    this.nbcase = message.nbCase;
    this.skillid = message.skillId;
    this.onCraftStarted.trigger();
  }

}