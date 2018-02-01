import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import {NetworkPhases} from "@/network/NetworkPhases";
import ServerStatusUpdateMessage from "@/protocol/network/messages/ServerStatusUpdateMessage";
import {sleep} from "@/utils/Time";
import Account from "@account";
import {ServerStatusEnum} from "@protocol/enums/ServerStatusEnum";
import ServersListMessage from "@protocol/network/messages/ServersListMessage";

export default class ServerSelectionFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("ServersListMessage", this.HandleServersListMessage, this);
    this.account.dispatcher.register("ServerStatusUpdateMessage", this.HandleServerStatusUpdateMessage, this);
    this.account.dispatcher.register("SelectedServerDataMessage", this.HandleSelectedServerDataMessage, this);
    this.account.dispatcher.register("serverDisconnecting", this.HandleserverDisconnecting, this);
    this.account.dispatcher.register("HelloGameMessage", this.HandleHelloGameMessage, this);
    this.account.dispatcher.register("AuthenticationTicketAcceptedMessage",
      this.HandleAuthenticationTicketAcceptedMessage, this);
    this.account.dispatcher.register("AuthenticationTicketRefusedMessage",
      this.HandleAuthenticationTicketRefusedMessage, this);
  }

  private async HandleServersListMessage(account: Account, message: ServersListMessage) {
    const server = account.accountConfig.characterCreation.create ?
      message.servers.find((s) => s._name === account.accountConfig.characterCreation.server)
      : account.accountConfig.characterCreation.server === "-" ?
        message.servers.find((s) => s.charactersCount > 0)
        : message.servers.find((s) => s._name === account.accountConfig.server);

    if (server === undefined || server.charactersCount === 0 && !account.accountConfig.characterCreation.create) {
      account.logger.logError(LanguageManager.trans("serverSelection"), LanguageManager.trans("cantSelectServer"));
      account.stop();
      return;
    }

    if (server.status !== ServerStatusEnum.ONLINE && server.status !== ServerStatusEnum.SAVING && !server.isSelectable) {
      account.logger.logError(LanguageManager.trans("serverSelection"), `${server._name} ${ServerStatusEnum[server.status]}`);
      account.stop();
      return;
    }

    if (server.status === ServerStatusEnum.SAVING) {
      account.framesData.serverToAutoConnectTo = server.id;
      account.logger.logInfo(LanguageManager.trans("serverSelection"), LanguageManager.trans("serverBackup", server._name));
    } else {
      // ONLINE
      account.logger.logDebug(LanguageManager.trans("serverSelection"), LanguageManager.trans("serverSelected", server._name));
      await account.network.sendMessageFree("ServerSelectionMessage", {
        serverId: server.id,
      });
    }
  }

  private async HandleServerStatusUpdateMessage(account: Account, message: ServerStatusUpdateMessage) {
    if (account.framesData.serverToAutoConnectTo !== 0 && message.server.id === account.framesData.serverToAutoConnectTo
      && message.server.status === ServerStatusEnum.ONLINE) {
      await sleep(2000);
      account.logger.logDebug(LanguageManager.trans("serverSelection"), LanguageManager.trans("serverOnline", message.server._name));
      await account.network.sendMessageFree("ServerSelectionMessage", {
        serverId: message.server.id,
      });
    }
  }

  private async HandleserverDisconnecting(account: Account, message: any) {
    switch (message.reason) {
      case "SERVER_GONE":
        account.stop();
        break;
      case "CONNECTION_FAILED":
        account.stop();
        break;
      default:
        break;
    }
  }

  private async HandleSelectedServerDataMessage(account: Account, message: any) {
    account.game.server.UpdateSelectedServerDataMessage(message);
    account.framesData.ticket = message.ticket;

    account.network.switchToGameServer(message._access, {
      address: message.address,
      id: message.serverId,
      port: message.port,
    });
  }

  private async HandleHelloGameMessage(account: Account, message: any) {
    account.network.sendMessageFree("AuthenticationTicketMessage", {
      lang: GlobalConfiguration.lang,
      ticket: account.framesData.ticket,
    });
    account.network.phase = NetworkPhases.GAME;
  }

  private async HandleAuthenticationTicketAcceptedMessage(account: Account, message: any) {
    // TODO: Send this maybe at the TrustStatusMessage
    account.network.sendMessageFree("CharactersListRequestMessage");
  }

  private async HandleAuthenticationTicketRefusedMessage(account: Account, message: any) {
    account.stop();
  }
}
