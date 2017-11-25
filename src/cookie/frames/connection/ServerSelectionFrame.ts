import { NetworkPhases } from "@/network/NetworkPhases";
import Account from "@account";
import { ServerStatusEnum } from "@protocol/enums/ServerStatusEnum";
import ServersListMessage from "@protocol/network/messages/ServersListMessage";

export default class ServerSelectionFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("ServersListMessage", this.HandleServersListMessage, this);
    this.account.dispatcher.register("SelectedServerDataMessage", this.HandleSelectedServerDataMessage, this);
    this.account.dispatcher.register("serverDisconnecting", this.HandleserverDisconnecting, this);
    this.account.dispatcher.register("HelloGameMessage", this.HandleHelloGameMessage, this);
    this.account.dispatcher.register("AuthenticationTicketAcceptedMessage",
      this.HandleAuthenticationTicketAcceptedMessage, this);
    this.account.dispatcher.register("AuthenticationTicketRefusedMessage",
      this.HandleAuthenticationTicketRefusedMessage, this);
  }

  private async HandleServersListMessage(account: Account, message: ServersListMessage) {
    const server = account.config.characterCreation.create ?
      message.servers.find((s) => s._name === account.config.characterCreation.server)
      : account.config.characterCreation.server === "-" ?
        message.servers.find((s) => s.charactersCount > 0)
        : message.servers.find((s) => s._name === account.data.server);

    if (server === undefined || server.charactersCount === 0 && !account.config.characterCreation.create) {
      account.logger.logError("", "Impossible de selectionner ce serveur");
      account.stop();
      return;
    }

    if (!server.isSelectable || server.status !== ServerStatusEnum.ONLINE) {
      account.logger.logError("", `${server._name} ${ServerStatusEnum[server.status]}`);
      account.stop();
      return;
    }

    account.network.sendMessage("ServerSelectionMessage", {
      serverId: server.id,
    });
    account.logger.logDebug("", `Selection du serveur ${server._name}`);
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
    account.network.sendMessage("AuthenticationTicketMessage", {
      lang: account.data.lang,
      ticket: account.framesData.ticket,
    });
    account.network.phase = NetworkPhases.GAME;
  }

  private async HandleAuthenticationTicketAcceptedMessage(account: Account, message: any) {
    // TODO: Send this maybe at the TrustStatusMessage
    account.network.sendMessage("CharactersListRequestMessage");
  }

  private async HandleAuthenticationTicketRefusedMessage(account: Account, message: any) {
    account.stop();
  }
}
