import Account from "@/account";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";
import { NetworkPhases } from "@/network/NetworkPhases";
import { ServerStatusEnum } from "@/protocol/enums/ServerStatusEnum";
import AuthenticationTicketAcceptedMessage from "@/protocol/network/messages/AuthenticationTicketAcceptedMessage";
import AuthenticationTicketRefusedMessage from "@/protocol/network/messages/AuthenticationTicketRefusedMessage";
import HelloGameMessage from "@/protocol/network/messages/HelloGameMessage";
import SelectedServerDataMessage from "@/protocol/network/messages/SelectedServerDataMessage";
import ServersListMessage from "@/protocol/network/messages/ServersListMessage";
import ServerStatusUpdateMessage from "@/protocol/network/messages/ServerStatusUpdateMessage";
import { sleep } from "@/utils/Time";

export default class ServerSelectionFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ServersListMessage",
      this.HandleServersListMessage,
      this
    );
    Frames.dispatcher.register(
      "ServerStatusUpdateMessage",
      this.HandleServerStatusUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "SelectedServerDataMessage",
      this.HandleSelectedServerDataMessage,
      this
    );
    Frames.dispatcher.register(
      "serverDisconnecting",
      this.HandleserverDisconnecting,
      this
    );
    Frames.dispatcher.register(
      "HelloGameMessage",
      this.HandleHelloGameMessage,
      this
    );
    Frames.dispatcher.register(
      "AuthenticationTicketAcceptedMessage",
      this.HandleAuthenticationTicketAcceptedMessage,
      this
    );
    Frames.dispatcher.register(
      "AuthenticationTicketRefusedMessage",
      this.HandleAuthenticationTicketRefusedMessage,
      this
    );
  }

  private async HandleServersListMessage(
    account: Account,
    message: ServersListMessage
  ) {
    const server = account.accountConfig.characterCreation.create
      ? message.servers.find(
          s => s.id === account.accountConfig.characterCreation.server
        )
      : account.accountConfig.server === -1
        ? message.servers.find(s => s.charactersCount > 0)
        : message.servers.find(s => s.id === account.accountConfig.server);

    if (
      server === undefined ||
      (server.charactersCount === 0 &&
        !account.accountConfig.characterCreation.create)
    ) {
      account.logger.logError(
        LanguageManager.trans("serverSelection"),
        LanguageManager.trans("cantSelectServer")
      );
      account.stop();
      return;
    }

    if (
      server.status !== ServerStatusEnum.ONLINE &&
      server.status !== ServerStatusEnum.SAVING &&
      !server.isSelectable
    ) {
      account.logger.logError(
        LanguageManager.trans("serverSelection"),
        `${server._name} ${ServerStatusEnum[server.status]}`
      );
      account.stop();
      return;
    }

    if (server.status === ServerStatusEnum.SAVING) {
      account.framesData.serverToAutoConnectTo = server.id;
      account.logger.logInfo(
        LanguageManager.trans("serverSelection"),
        LanguageManager.trans("serverBackup", server._name)
      );
    } else {
      // ONLINE
      account.logger.logDebug(
        LanguageManager.trans("serverSelection"),
        LanguageManager.trans("serverSelected", server._name)
      );
      await account.network.sendMessageFree("ServerSelectionMessage", {
        serverId: server.id
      });
    }
  }

  private async HandleServerStatusUpdateMessage(
    account: Account,
    message: ServerStatusUpdateMessage
  ) {
    if (
      account.framesData.serverToAutoConnectTo !== 0 &&
      message.server.id === account.framesData.serverToAutoConnectTo &&
      message.server.status === ServerStatusEnum.ONLINE
    ) {
      await sleep(2000);
      account.logger.logDebug(
        LanguageManager.trans("serverSelection"),
        LanguageManager.trans("serverOnline", message.server._name)
      );
      await account.network.sendMessageFree("ServerSelectionMessage", {
        serverId: message.server.id
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

  private async HandleSelectedServerDataMessage(
    account: Account,
    message: SelectedServerDataMessage
  ) {
    account.game.server.UpdateSelectedServerDataMessage(message);
    account.framesData.ticket = message.ticket;

    account.network.switchToGameServer(message._access, {
      address: message.address,
      id: message.serverId,
      port: message.port
    });
  }

  private async HandleHelloGameMessage(
    account: Account,
    message: HelloGameMessage
  ) {
    account.network.sendMessageFree("AuthenticationTicketMessage", {
      lang: GlobalConfiguration.lang,
      ticket: account.framesData.ticket
    });
    account.network.phase = NetworkPhases.GAME;
  }

  private async HandleAuthenticationTicketAcceptedMessage(
    account: Account,
    message: AuthenticationTicketAcceptedMessage
  ) {
    // TODO: Send this maybe at the TrustStatusMessage
    account.network.sendMessageFree("CharactersListRequestMessage");
  }

  private async HandleAuthenticationTicketRefusedMessage(
    account: Account,
    message: AuthenticationTicketRefusedMessage
  ) {
    account.stop();
  }
}
