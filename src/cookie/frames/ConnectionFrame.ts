import axios from "axios";
import { Account } from "../game/Account";
import { randomString } from "../utils/Random";

export default class ConnectionFrame {

  private account: Account;
  private access: string;
  private sequenceNumber: number = 0;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  public register() {
    this.account.dispatcher.register("HelloConnectMessage", this.HandleHelloConnectMessage, this);
    this.account.dispatcher.register("assetsVersionChecked", this.HandleassetsVersionChecked, this);
    this.account.dispatcher.register("ServersListMessage", this.HandleServersListMessage, this);
    this.account.dispatcher.register("IdentificationSuccessMessage", this.HandleIdentificationSuccessMessage, this);
    this.account.dispatcher.register("SelectedServerDataMessage", this.HandleSelectedServerDataMessage, this);
    this.account.dispatcher.register("serverDisconnecting", this.HandleserverDisconnecting, this);
    this.account.dispatcher.register("HelloGameMessage", this.HandleHelloGameMessage, this);
    this.account.dispatcher.register("AuthenticationTicketAcceptedMessage",
      this.HandleAuthenticationTicketAcceptedMessage, this);
    this.account.dispatcher.register("AuthenticationTicketRefusedMessage",
      this.HandleAuthenticationTicketRefusedMessage, this);
    this.account.dispatcher.register("CharactersListMessage", this.HandleCharactersListMessage, this);
    this.account.dispatcher.register("CharacterSelectedSuccessMessage",
      this.HandleCharacterSelectedSuccessMessage, this);
    this.account.dispatcher.register("SequenceNumberRequestMessage", this.HandleSequenceNumberRequestMessage, this);
    this.account.dispatcher.register("ChatServerMessage", this.HandleChatServerMessage, this);
    this.account.dispatcher.register("SystemMessageDisplayMessage", this.HandleSystemMessageDisplayMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
  }

  public HandleTextInformationMessage(account: Account, data: any) {
    // EventHub.$emit("logs", {
    //   action: "CHAT",
    //   data: "[MESSAGE] " + data.text,
    // });
    console.log("[MESSAGE] " + data.text);
  }

  public HandleSystemMessageDisplayMessage(account: Account, data: any) {
    // EventHub.$emit("logs", {
    //   action: "CHAT",
    //   data: "[IMPORTANT] " + data.text,
    // });
    console.log("[IMPORTANT] " + data.text);
  }

  public HandleChatServerMessage(account: Account, data: any) {
    // EventHub.$emit("logs", {
    //   action: "CHAT",
    //   data: "[" + data.senderName + "] " + data.content,
    // });
    console.log("[" + data.senderName + "] " + data.content);
  }

  public HandleSequenceNumberRequestMessage(account: Account, data: any) {
    this.sequenceNumber++;
    account.client.sendMessage("SequenceNumberMessage", {
      number: this.sequenceNumber,
    });
  }

  public HandleHelloConnectMessage(account: Account, data: any) {
    account.key = data.key;
    account.salt = data.salt;

    // EventHub.$emit("logs", {
    //   action: "INFO",
    //   data: "Hey, t'es connecté!",
    // });
    console.log("Connecté au serveur d'authentification");
    account.client.send("checkAssetsVersion", {
      assetsVersion: account.client.assetsVersion,
      staticDataVersion: account.client.staticDataVersion,
    });
  }

  public HandleassetsVersionChecked(account: Account, data: any) {
    account.client.send("login", {
      key: account.key,
      salt: account.salt,
      token: account.haapi.token,
      username: account.username,
    });
  }

  public HandleServersListMessage(account: Account, data: any) {
    for (const server of data.servers) {
      if (server.isSelectable && server.charactersCount > 0) {
        account.client.sendMessage("ServerSelectionMessage", {
          serverId: server.id,
        });
        return;
      }
    }

    console.log("Aucuns serveurs n'a pu être selectionné.");
    account.client.close();
  }

  public HandleIdentificationSuccessMessage(account: Account, data: any) {
    account.accountCreation = data.accountCreation;
    account.accountId = data.accountId;
    account.communityId = data.communityId;
    account.hasRights = data.hasRights;
    account.login = data.login;
    account.nickname = data.nickname;
    account.secretQuestion = data.secretQuestion;
    account.subscriptionEndDate = data.subscriptionEndDate;
    account.wasAlreadyConnected = data.wasAlreadyConnected;

    console.log("Account", account);
  }

  public HandleserverDisconnecting(account: Account, data: any) {
    switch (data.reason) {
      case "SERVER_GONE":
        account.client.migrate(this.access);
        break;
      case "CONNECTION_FAILED":
        account.stop();
        break;
      default:
        break;
    }
  }

  public HandleSelectedServerDataMessage(account: Account, data: any) {
    account.ticket = data.ticket;
    this.access = data._access;

    account.client.server = {
      address: data.address,
      id: data.serverId,
      port: data.port,
    };
  }

  public HandleHelloGameMessage(account: Account, data: any) {
    account.client.sendMessage("AuthenticationTicketMessage", {
      lang: account.lang,
      ticket: account.ticket,
    });
  }

  public HandleAuthenticationTicketAcceptedMessage(account: Account, data: any) {
    account.client.sendMessage("CharactersListRequestMessage");
  }

  public HandleAuthenticationTicketRefusedMessage(account: Account, data: any) {
    account.stop();
  }

  public HandleCharactersListMessage(account: Account, data: any) {
    account.client.sendMessage("CharacterSelectionMessage", {
      id: data.characters[0].id,
    });
  }

  public HandleCharacterSelectedSuccessMessage(account: Account, data: any) {
    account.character.infos = data.infos;

    account.client.sendMessage("kpiStartSession", {
      accountSessionId: account.login,
      isSubscriber: account.subscriptionEndDate !== 0,
    });
    account.client.send("moneyGoultinesAmountRequest");
    account.client.sendMessage("QuestListRequestMessage");
    account.client.sendMessage("FriendsGetListMessage");
    account.client.sendMessage("IgnoredGetListMessage");
    account.client.sendMessage("SpouseGetInformationsMessage");
    account.client.send("bakSoftToHardCurrentRateRequest");
    account.client.send("bakHardToSoftCurrentRateRequest");
    account.client.send("restoreMysteryBox");
    account.client.sendMessage("ClientKeyMessage", { key: randomString(21) });
    account.client.sendMessage("GameContextCreateRequestMessage");
  }
}
