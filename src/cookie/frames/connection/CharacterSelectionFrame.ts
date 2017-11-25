import Account from "@account";
import CharactersListMessage from "@protocol/network/messages/CharactersListMessage";
import { randomString } from "@utils/Random";
import { isBlank } from "@utils/String";

export default class CharacterSelectionFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("CharactersListMessage", this.HandleCharactersListMessage, this);
    this.account.dispatcher.register("CharacterNameSuggestionSuccessMessage",
      this.HandleCharacterNameSuggestionSuccessMessage, this);
    this.account.dispatcher.register("CharacterCreationResultMessage",
      this.HandleCharacterCreationResultMessage, this);
    this.account.dispatcher.register("CharacterSelectedSuccessMessage",
      this.HandleCharacterSelectedSuccessMessage, this);
    this.account.dispatcher.register("CharacterSelectedForceMessage",
      this.HandleCharacterSelectedForceMessage, this);
    this.account.dispatcher.register("GameContextCreateMessage",
      this.HandleGameContextCreateMessage, this);
  }

  private async HandleCharactersListMessage(account: Account, message: CharactersListMessage) {
    account.game.server.UpdateCharactersListMessage(message);

    if (account.config.characterCreation.create) {
      await account.extensions.characterCreation.UpdateCharactersListMessage(message);
      return;
    }

    if (message.characters.length > 0) {
      const char = isBlank(account.data.character) ?
        message.characters[0] : message.characters.find((c) => c.name === account.data.character);

      if (char === undefined) {
        account.logger.logError("CharacterSelectionFrame", `Character ${account.data.character} don't found!`);
      } else {
        await account.network.sendMessage("CharacterSelectionMessage", {
          id: char.id,
        });
        account.logger.logDebug("CharacterSelectionFrame", `Character ${char.name}(${char.level}) selected!`);
      }
    } else {
      account.logger.logError("CharacterSelectionFrame", `No characters found on this account!`);
    }
  }

  private async HandleCharacterNameSuggestionSuccessMessage(account: Account, message: any) {
    account.extensions.characterCreation.UpdateCharacterNameSuggestionSuccessMessage(message);
  }

  private async HandleCharacterCreationResultMessage(account: Account, message: any) {
    account.extensions.characterCreation.UpdateCharacterCreationResultMessage(message);
  }

  private async HandleCharacterSelectedSuccessMessage(account: Account, message: any) {
    account.game.character.UpdateCharacterSelectedSuccessMessage(message);

    account.network.sendMessage("kpiStartSession", {
      accountSessionId: account.data.login,
      isSubscriber: account.data.subscriptionEndDate !== 0,
    });
    account.network.send("moneyGoultinesAmountRequest");
    account.network.sendMessage("QuestListRequestMessage");
    account.network.sendMessage("FriendsGetListMessage");
    account.network.sendMessage("IgnoredGetListMessage");
    account.network.sendMessage("SpouseGetInformationsMessage");
    account.network.send("bakSoftToHardCurrentRateRequest");
    account.network.send("bakHardToSoftCurrentRateRequest");
    account.network.send("restoreMysteryBox");
    account.network.sendMessage("ClientKeyMessage", { key: randomString(21) });
    account.network.sendMessage("GameContextCreateRequestMessage");
  }

  private async HandleGameContextCreateMessage(account: Account, message: any) {
    if (!account.framesData.initialized && message.context === 1) {
      await account.network.sendMessage("ObjectAveragePricesGetMessage");
      account.framesData.initialized = true;
    }
  }

  private async HandleCharacterSelectedForceMessage(account: Account, message: any) {
    await account.network.sendMessage("CharacterSelectedForceReadyMessage");
  }
}
