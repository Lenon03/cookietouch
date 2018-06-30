import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import GameRolePlayPlayerFightFriendlyRequestedMessage from "@/protocol/network/messages/GameRolePlayPlayerFightFriendlyRequestedMessage";
import { sleep } from "@/utils/Time";

export default class RolePlayExtension {
  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.account.game.exchange.ExchangeRequested.on(from =>
      this.exchangeRequested(from)
    );
    this.account.game.exchange.RemoteReady.on(() => this.remoteReady());

    this.account.network.registerMessage(
      "GameRolePlayPlayerFightFriendlyRequestedMessage",
      this.handleGameRolePlayPlayerFightFriendlyRequestedMessage
    );
  }

  private exchangeRequested(from: number) {
    // If the character isn't authorized to tradus us, refuse it
    if (!this.account.config.authorizedTradesFrom.includes(from)) {
      if (this.account.config.ignoreNonAuthorizedTrades) {
        const player = this.account.game.map.getPlayer(from);

        if (player !== null) {
          this.account.network.sendMessageFree("IgnoredAddRequestMessage", {
            name: player.name,
            session: true
          });
          this.account.network.sendMessageFree("LeaveDialogRequestMessage");
          this.account.logger.logInfo(
            LanguageManager.trans("rolePlayExtension"),
            LanguageManager.trans("playerIgnored", player.name)
          );
          return;
        }
      } else {
        // If the IgnoreNonAuthorizedTrades option is disabled or the player wasn't found on the map (somehow)
        this.account.network.sendMessageFree("LeaveDialogRequestMessage");
      }
    } else {
      // Otherwise accept it
      this.account.network.sendMessageFree("ExchangeAcceptMessage");
    }
  }

  private remoteReady() {
    this.account.game.exchange.sendReady();
  }

  private handleGameRolePlayPlayerFightFriendlyRequestedMessage = async (
    account: Account,
    message: GameRolePlayPlayerFightFriendlyRequestedMessage
  ) => {
    if (message.targetId !== account.game.character.id) {
      return;
    }

    await sleep(1000);

    const player = account.game.map.getPlayer(message.sourceId);
    if (player !== null) {
      await account.network.sendMessageFree(
        "GameRolePlayPlayerFightFriendlyAnswerMessage",
        {
          accept: false,
          fightId: message.fightId
        }
      );
      account.network.sendMessageFree("IgnoredAddRequestMessage", {
        name: player.name,
        session: true
      });
      account.network.sendMessageFree("LeaveDialogRequestMessage");
      this.account.logger.logInfo(
        LanguageManager.trans("rolePlayExtension"),
        LanguageManager.trans("playerIgnored", player.name)
      );
    }
  };
}
