import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import ObjectEntry from "@game/character/inventory/ObjectEntry";
import { CharacterInventoryPositionEnum } from "@protocol/enums/CharacterInventoryPositionEnum";
import { ExchangeTypeEnum } from "@protocol/enums/ExchangeTypeEnum";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";

export default class Exchange {
  public objects: ObjectEntry[];
  public remoteObjects: ObjectEntry[];
  public kamas: number;
  public remoteKamas: number;
  public currentWeight: number;
  public maxWeight: number;
  public remoteCurrentWeight: number;
  public remoteMaxWeight: number;
  public isReady: boolean;
  public remoteIsReady: boolean;

  get weightPercent() {
    return this.currentWeight / this.maxWeight * 100;
  }

  get remoteWeightPercent() {
    return this.remoteCurrentWeight / this.remoteMaxWeight * 100;
  }

  private account: Account;
  private step: number;

  public get ExchangeRequested() { return this.onExchangeRequested.expose(); }
  public get ExchangeStarted() { return this.onExchangeStarted.expose(); }
  public get ExchangeContentChanged() { return this.onExchangeContentChanged.expose(); }
  public get RemoteReady() { return this.onRemoteReady.expose(); }
  public get ExchangeLeft() { return this.onExchangeLeft.expose(); }
  private readonly onExchangeRequested = new LiteEvent<number>();
  private readonly onExchangeStarted = new LiteEvent<void>();
  private readonly onExchangeContentChanged = new LiteEvent<void>();
  private readonly onRemoteReady = new LiteEvent<void>();
  private readonly onExchangeLeft = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.objects = new Array<ObjectEntry>();
    this.remoteObjects = new Array<ObjectEntry>();
  }

  public startExchange(id: number): boolean {
    if (this.account.isBusy) {
      return false;
    }

    const player = this.account.game.map.players.find((p) => p.id === id);
    if (player === null) {
      return false;
    }

    this.account.network.sendMessage("ExchangePlayerRequestMessage", {
      exchangeType: ExchangeTypeEnum.PLAYER_TRADE,
      target: id,
    });

    return true;
  }

  public sendReady(): boolean {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    this.account.network.sendMessage("ExchangeReadyMessage", {
      ready: true,
      step: this.step,
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

    quantity = quantity <= 0 ? obj.quantity : (quantity > obj.quantity ? obj.quantity : quantity);

    this.account.network.sendMessage("ExchangeObjectMoveMessage", {
      objectUID: obj.uid,
      quantity,
    });

    this.account.logger.logInfo("", `Vous avez ajouté ${quantity} ${obj.name} à l'échange.`);
    return true;
  }

  public removeItem(gid: number, quantity: number): boolean {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    const obj = this.objects.find((o) => o.gid === gid);
    if (obj === undefined) {
      return false;
    }

    quantity = quantity <= 0 ? obj.quantity : (quantity > obj.quantity ? obj.quantity : quantity);

    this.account.network.sendMessage("ExchangeObjectMoveMessage", {
      objectUID: obj.uid,
      quantity: quantity * -1,
    });

    this.account.logger.logInfo("", `Vous avez retiré ${quantity} ${obj.name} de l'échange.`);
    return true;
  }

  public putAllItems(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.account.state !== AccountStates.EXCHANGE) {
        return resolve(false);
      }

      this.account.logger.logDebug("", "On commence à ajouter tous les objets dans l'échange...");

      for (const obj of this.account.game.character.inventory.equipments) {
        if (!obj.exchangeable || obj.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED) {
          continue;
        }
        this.account.network.sendMessage("ExchangeObjectMoveMessage", {
          objectUID: obj.uid,
          quantity: obj.quantity,
        });
        await sleep(600);
      }

      for (const obj of this.account.game.character.inventory.consumables) {
        if (!obj.exchangeable || obj.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED) {
          continue;
        }
        this.account.network.sendMessage("ExchangeObjectMoveMessage", {
          objectUID: obj.uid,
          quantity: obj.quantity,
        });
        await sleep(600);
      }

      for (const obj of this.account.game.character.inventory.resources) {
        if (!obj.exchangeable || obj.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED) {
          continue;
        }
        this.account.network.sendMessage("ExchangeObjectMoveMessage", {
          objectUID: obj.uid,
          quantity: obj.quantity,
        });
        await sleep(600);
      }

      this.account.logger.logDebug("", "Tous les objets ont été ajouté à l'échange...");
      return resolve(true);
    });
  }

  public putKamas(quantity: number) {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    quantity = quantity <= 0 ? this.account.game.character.inventory.kamas
      : (quantity > this.account.game.character.inventory.kamas ?
        this.account.game.character.inventory.kamas : quantity);

    this.account.logger.logInfo("", `Vous avez ajouté ${quantity} kamas à l'échange.`);
    this.account.network.sendMessage("ExchangeObjectMoveKamaMessage", { quantity });
    return true;
  }

  public removeKamas(quantity: number) {
    if (this.account.state !== AccountStates.EXCHANGE) {
      return false;
    }

    quantity = quantity <= 0 ? this.kamas : (quantity > this.kamas ? this.kamas : quantity);

    this.account.logger.logInfo("", `Vous avez ajouté ${quantity} kamas à l'échange.`);
    this.account.network.sendMessage("ExchangeObjectMoveKamaMessage", { quantity: this.kamas - quantity });
    return true;
  }

  public async UpdateExchangeRequestedTradeMessage(message: any) {
    if (message.exchangeType === ExchangeTypeEnum.PLAYER_TRADE
      && message.target === this.account.game.character.id) {
      this.onExchangeRequested.trigger(message.source);
    }
  }

  public async UpdateExchangeStartedWithPodsMessage(message: any) {
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

  public async UpdateExchangeObjectAddedMessage(message: any) {
    const newObj = new ObjectEntry(message.object);
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

  public async UpdateExchangeObjectModifiedMessage(message: any) {
    const modifiedObj = message.remote ? this.remoteObjects.find((o) => o.uid === message.object.objectUID)
      : this.objects.find((o) => o.uid === message.object.objectUID);

    const qtyDiff = message.object.quantity - modifiedObj.quantity;
    modifiedObj.UpdateObjectItem(message.object);

    if (message.remote) {
      this.remoteCurrentWeight += (qtyDiff * modifiedObj.realWeight);
    } else {
      this.currentWeight += (qtyDiff * modifiedObj.realWeight);
    }
    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeObjectRemovedMessage(message: any) {
    const removedObj = message.remote ? this.remoteObjects.find((o) => o.uid === message.object.objectUID)
      : this.objects.find((o) => o.uid === message.object.objectUID);

    if (message.remote) {
      this.remoteCurrentWeight -= removedObj.quantity * removedObj.realWeight;
      // Delete on the list?
      this.remoteObjects = this.remoteObjects.filter((o) => o.uid !== removedObj.uid);
    } else {
      this.currentWeight -= removedObj.quantity * removedObj.realWeight;
      // Delete on the list?
      this.objects = this.objects.filter((o) => o.uid !== removedObj.uid);
    }

    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeKamaModifiedMessage(message: any) {
    if (message.remote) {
      this.remoteKamas = message.quantity;
    } else {
      this.kamas = message.quantity;
    }

    this.step++;
    this.onExchangeContentChanged.trigger();
  }

  public async UpdateExchangeIsReadyMessage(message: any) {
    if (message.id === this.account.game.character.id) {
      this.isReady = true;
    } else {
      this.remoteIsReady = true;
      this.onRemoteReady.trigger();
    }
  }

  public async UpdateExchangeLeaveMessage(message: any) {
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
}
