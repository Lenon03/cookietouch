import Account from "../../Account";

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

  private async HandleServersListMessage(account: Account, data: any) {
    for (const server of data.servers) {
      if (server.isSelectable && server.charactersCount > 0) {
        account.network.sendMessage("ServerSelectionMessage", {
          serverId: server.id,
        });
        return;
      }
    }

    console.log("Aucuns serveurs n'a pu être selectionné.");
    account.network.close();
  }

  private async HandleserverDisconnecting(account: Account, data: any) {
    switch (data.reason) {
      case "SERVER_GONE":
        account.network.migrate(account.network.access);
        break;
      case "CONNECTION_FAILED":
        account.stop();
        break;
      default:
        break;
    }
  }

  private async HandleSelectedServerDataMessage(account: Account, data: any) {
    account.framesData.ticket = data.ticket;
    account.network.access = data._access;

    account.network.server = {
      address: data.address,
      id: data.serverId,
      port: data.port,
    };
  }

  private async HandleHelloGameMessage(account: Account, data: any) {
    account.network.sendMessage("AuthenticationTicketMessage", {
      lang: account.data.lang,
      ticket: account.framesData.ticket,
    });
  }

  private async HandleAuthenticationTicketAcceptedMessage(account: Account, data: any) {
    account.network.sendMessage("CharactersListRequestMessage");
  }

  private async HandleAuthenticationTicketRefusedMessage(account: Account, data: any) {
    account.stop();
  }
}
