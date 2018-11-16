import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";
import { CharacterInventoryPositionEnum } from "@/protocol/enums/CharacterInventoryPositionEnum";
import { ExchangeTypeEnum } from "@/protocol/enums/ExchangeTypeEnum";
import ExchangeIsReadyMessage from "@/protocol/network/messages/ExchangeIsReadyMessage";
import ExchangeKamaModifiedMessage from "@/protocol/network/messages/ExchangeKamaModifiedMessage";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeObjectAddedMessage from "@/protocol/network/messages/ExchangeObjectAddedMessage";
import ExchangeObjectModifiedMessage from "@/protocol/network/messages/ExchangeObjectModifiedMessage";
import ExchangeObjectRemovedMessage from "@/protocol/network/messages/ExchangeObjectRemovedMessage";
import ExchangeRequestedTradeMessage from "@/protocol/network/messages/ExchangeRequestedTradeMessage";
import ExchangeStartedWithPodsMessage from "@/protocol/network/messages/ExchangeStartedWithPodsMessage";
import LiteEvent from "@/utils/LiteEvent";
import { sleep } from "@/utils/Time";
import ExchangeShopStockStartedMessage from "@/protocol/network/messages/ExchangeShopStockStartedMessage";

export default class Exchange {
  public objects: ObjectEntry[];
  public remoteObjects: ObjectEntry[];
  public objectsInfos: ObjectItemToSell[];
  public kamas: number = 0;
  public remoteKamas: number = 0;
  public currentWeight: number = 0;
  public maxWeight: number = 0;
  public remoteCurrentWeight: number = 0;
  public remoteMaxWeight: number = 0;
  public isReady: boolean = false;
  public remoteIsReady: boolean = false;
  private account: Account;
  private step: number = 0;
  private readonly onExchangeRequested = new LiteEvent<number>();
  private readonly onExchangeStarted = new LiteEvent<void>();
  private readonly onExchangeContentChanged = new LiteEvent<void>();
  private readonly onRemoteReady = new LiteEvent<void>();
  private readonly onExchangeLeft = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.objects = [];
    this.remoteObjects = [];
    this.objectsInfos = [];
  }

  get weightPercent() {
    return (this.currentWeight / this.maxWeight) * 100;
  }

  get remoteWeightPercent() {
    return (this.remoteCurrentWeight / this.remoteMaxWeight) * 100;
  }

  public get ExchangeRequested() {
    return this.onExchangeRequested.expose();
  }

  public get ExchangeStarted() {
    return this.onExchangeStarted.expose();
  }

  public get ExchangeContentChanged() {
    return this.onExchangeContentChanged.expose();
  }

  public get RemoteReady() {
    return this.onRemoteReady.expose();
  }

  public get ExchangeLeft() {
    return this.onExchangeLeft.expose();
  }
  public startShop(): boolean {
    this.account.network.sendMessageFree("ExchangeRequestOnShopStockMessage", {
    });
    return true;
  }
  public addShopItem(guid: number, quantity: number, price: number): boolean {
    this.account.network.sendMessageFree("ExchangeObjectMovePricedMessage", {
      objectUID: guid,
      quantity: quantity,
      price: price
    });
    return true;
  }
  public startExchange(id: number): boolean {
    if (this.account.isBusy) {
      return false;
    }

    const player = this.account.game.map.players.find(p => p.id === id);
    if (player === null) {
      return false;
    }

    this.account.network.sendMessageFree("ExchangePlayerRequestMessage", {
      exchangeType: ExchangeTypeEnum.PLAYER_TRADE,
      target: id
    });

    return true;
  }

  public sendReady(): boolean {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    this.account.network.sendMessageFree("ExchangeReadyMessage", {
      ready: true,
      step: this.step
    });

    return true;
  }

  public putItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    const obj = this.account.game.character.inventory.getObjectByGid(gid);
    if (obj === null) {
      return false;
    }

    quantity =
      quantity <= 0
        ? obj.quantity
        : quantity > obj.quantity
          ? obj.quantity
          : quantity;

    this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
      objectUID: obj.uid,
      quantity
    });

    this.account.logger.logInfo(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeAdded", quantity, obj.name)
    );
    return true;
  }

  public removeItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    const obj = this.objects.find(o => o.gid === gid);
    if (obj === undefined) {
      return false;
    }

    quantity =
      quantity <= 0
        ? obj.quantity
        : quantity > obj.quantity
          ? obj.quantity
          : quantity;

    this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
      objectUID: obj.uid,
      quantity: quantity * -1
    });

    this.account.logger.logInfo(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeRemoved", quantity, obj.name)
    );
    return true;
  }

  public async putAllItems(): Promise<boolean> {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    this.account.logger.logDebug(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeBeginAddAll")
    );

    this.account.game.character.inventory.equipments.ForEach(async obj => {
      if (!obj) {
        return;
      }
      if (
        !obj.exchangeable ||
        obj.position !==
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
      ) {
        return;
      }
      this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
        objectUID: obj.uid,
        quantity: obj.quantity
      });
      await sleep(600);
    });

    this.account.game.character.inventory.consumables.ForEach(async obj => {
      if (!obj) {
        return;
      }
      if (
        !obj.exchangeable ||
        obj.position !==
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
      ) {
        return;
      }
      this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
        objectUID: obj.uid,
        quantity: obj.quantity
      });
      await sleep(600);
    });

    this.account.game.character.inventory.resources.ForEach(async obj => {
      if (!obj) {
        return;
      }
      if (
        !obj.exchangeable ||
        obj.position !==
        CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
      ) {
        return;
      }
      this.account.network.sendMessageFree("ExchangeObjectMoveMessage", {
        objectUID: obj.uid,
        quantity: obj.quantity
      });
      await sleep(600);
    });

    this.account.logger.logDebug(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeAllAdded")
    );
    return true;
  }

  public async removeAllItems(): Promise<boolean> {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    if (this.objects.length === 0) {
      return false;
    }

    this.account.logger.logDebug(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeBeginRemoveAll")
    );

    for (const obj of this.objects) {
      this.removeItem(obj.gid, obj.quantity);
      await sleep(600);
    }

    this.account.logger.logDebug(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeAllRemoved")
    );
    return true;
  }

  public putKamas(quantity: number) {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    quantity =
      quantity <= 0
        ? this.account.game.character.inventory.kamas
        : quantity > this.account.game.character.inventory.kamas
          ? this.account.game.character.inventory.kamas
          : quantity;

    this.account.logger.logInfo(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeAddedKamas", quantity)
    );
    this.account.network.sendMessageFree("ExchangeObjectMoveKamaMessage", {
      quantity
    });
    return true;
  }

  public removeKamas(quantity: number) {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    quantity =
      quantity <= 0
        ? this.kamas
        : quantity > this.kamas
          ? this.kamas
          : quantity;

    this.account.logger.logInfo(
      LanguageManager.trans("exchange"),
      LanguageManager.trans("exchangeRemovedKamas", quantity)
    );
    this.account.network.sendMessageFree("ExchangeObjectMoveKamaMessage", {
      quantity: this.kamas - quantity
    });
    return true;
  }

  public async UpdateExchangeRequestedTradeMessage(
    message: ExchangeRequestedTradeMessage
  ) {
    if (
      message.exchangeType === ExchangeTypeEnum.PLAYER_TRADE &&
      message.target === this.account.game.character.id
    ) {
      this.onExchangeRequested.trigger(message.source);
    }
  }

  public async UpdateExchangeStartedWithPodsMessage(
    message: ExchangeStartedWithPodsMessage
  ) {
    this.step = 0;
    this.isReady = false;
    this.remoteIsReady = false;
    this.account.state = AccountStates.EXCHANGE;

    if (message.firstCharacterId === this.account.game.character.id) {
      this.currentWeight = message.firstCharacterCurrentWeight;
      this.maxWeight = message.firstCharacterMaxWeight;
      this.remoteCurrentWeight = message.secondCharacterCurrentWeight;
      this.remoteMaxWeight = message.secondCharacterMaxWeight;
    } else {
      this.currentWeight = message.secondCharacterCurrentWeight;
      this.maxWeight = message.secondCharacterMaxWeight;
      this.remoteCurrentWeight = message.firstCharacterCurrentWeight;
      this.remoteMaxWeight = message.firstCharacterMaxWeight;
    }
    this.onExchangeStarted.trigger();
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
    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeObjectModifiedMessage(
    message: ExchangeObjectModifiedMessage
  ) {
    const modifiedObj = message.remote
      ? this.remoteObjects.find(o => o.uid === message.object.objectUID)
      : this.objects.find(o => o.uid === message.object.objectUID);

    if (!modifiedObj) {
      this.account.logger.logWarning(
        LanguageManager.trans("exchange"),
        LanguageManager.trans("objectNotFound", message.object.objectUID)
      );
      return;
    }

    const qtyDiff = message.object.quantity - modifiedObj.quantity;
    modifiedObj.UpdateObjectItem(message.object);

    if (message.remote) {
      this.remoteCurrentWeight += qtyDiff * modifiedObj.realWeight;
    } else {
      this.currentWeight += qtyDiff * modifiedObj.realWeight;
    }
    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeObjectRemovedMessage(
    message: ExchangeObjectRemovedMessage
  ) {
    const removedObj = message.remote
      ? this.remoteObjects.find(o => o.uid === message.objectUID)
      : this.objects.find(o => o.uid === message.objectUID);

    if (!removedObj) {
      this.account.logger.logWarning(
        LanguageManager.trans("exchange"),
        LanguageManager.trans("objectNotFound", message.objectUID)
      );
      return;
    }

    if (message.remote) {
      this.remoteCurrentWeight -= removedObj.quantity * removedObj.realWeight;
      // Delete on the list?
      this.remoteObjects = this.remoteObjects.filter(
        o => o.uid !== removedObj.uid
      );
    } else {
      this.currentWeight -= removedObj.quantity * removedObj.realWeight;
      // Delete on the list?
      this.objects = this.objects.filter(o => o.uid !== removedObj.uid);
    }

    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeKamaModifiedMessage(
    message: ExchangeKamaModifiedMessage
  ) {
    if (message.remote) {
      this.remoteKamas = message.quantity;
    } else {
      this.kamas = message.quantity;
    }

    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeIsReadyMessage(message: ExchangeIsReadyMessage) {
    if (message.id === this.account.game.character.id) {
      this.isReady = true;
    } else {
      this.remoteIsReady = true;
      this.onRemoteReady.trigger();
    }
  }

  public async UpdateExchangeLeaveMessage(message: ExchangeLeaveMessage) {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return;
    }

    this.objects = [];
    this.remoteObjects = [];
    this.kamas = 0;
    this.remoteKamas = 0;
    this.currentWeight = 0;
    this.maxWeight = 0;
    this.remoteCurrentWeight = 0;
    this.remoteMaxWeight = 0;
    this.step = 0;
    this.account.state = AccountStates.NONE;
    this.onExchangeLeft.trigger();
  }
  public async UpdateExchangeShopStockStarted(message: ExchangeShopStockStartedMessage) {
    this.objectsInfos = message.objectsInfos;
  }
}
