import Account from "@account";
import GameRolePlayPlayerFightFriendlyRequestedMessage from "@protocol/network/messages/GameRolePlayPlayerFightFriendlyRequestedMessage";
import { sleep } from "@utils/Time";

export default class RolePlayExtension {
  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.account.game.exchange.ExchangeRequested.on((from) => this.exchangeRequested(from));
    this.account.game.exchange.RemoteReady.on(() => this.remoteReady());

    this.account.dispatcher.register("GameRolePlayPlayerFightFriendlyRequestedMessage",
    this.HandleGameRolePlayPlayerFightFriendlyRequestedMessage, this);
  }

  private exchangeRequested(from: number) {
    // If the character isn't authorized to tradus us, refuse it
    if (!this.account.config.authorizedTradesFrom.includes(from)) {
      if (this.account.config.ignoreNonAuthorizedTrades) {
        const player = this.account.game.map.getPlayer(from);

        if (player !== null) {
          this.account.network.sendMessage("IgnoredAddRequestMessage", { name: player.name, session: true });
          this.account.network.sendMessage("LeaveDialogRequestMessage");
          this.account.logger.logInfo("", `Le joueur ${player.name} a été ignoré pour la session`);
          return;
        }
      } else {
        // If the IgnoreNonAuthorizedTrades option is disabled or the player wasn't found on the map (somehow)
        this.account.network.sendMessage("LeaveDialogRequestMessage");
      }
    } else {
      // Otherwise accept it
      this.account.network.sendMessage("ExchangeAcceptMessage");
    }
  }

  private remoteReady() {
    this.account.game.exchange.sendReady();
  }

  private async HandleGameRolePlayPlayerFightFriendlyRequestedMessage(account: Account, message: GameRolePlayPlayerFightFriendlyRequestedMessage) {
    if (message.targetId !== account.game.character.id) {
      return;
    }

    await sleep(1000);

    const player = account.game.map.getPlayer(message.sourceId);
    if (player !== null) {
      await account.network.sendMessage("GameRolePlayPlayerFightFriendlyAnswerMessage", {
        accept: false,
        fightId: message.fightId,
      });
      account.network.sendMessage("IgnoredAddRequestMessage", { name: player.name, session: true });
      account.network.sendMessage("LeaveDialogRequestMessage");
      this.account.logger.logInfo("", `Le joueur ${player.name} a été ignoré pour la session`);
    }
  }
}
