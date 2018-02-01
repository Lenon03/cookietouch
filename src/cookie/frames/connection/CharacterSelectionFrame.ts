import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import CharactersListMessage from "@protocol/network/messages/CharactersListMessage";
import {randomString} from "@utils/Random";
import {isBlank} from "@utils/String";

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

    if (account.accountConfig.characterCreation.create) {
      await account.extensions.characterCreation.UpdateCharactersListMessage(message);
      return;
    }

    if (message.characters.length > 0) {
      const char = isBlank(account.accountConfig.character) ?
        message.characters[0] : message.characters.find((c) => c.name === account.accountConfig.character);

      if (char === undefined) {
        account.logger.logError(LanguageManager.trans("characterSelectionFrame"), `Character ${account.accountConfig.character} don't found!`);
      } else {
        await account.network.sendMessageFree("CharacterSelectionMessage", {
          id: char.id,
        });
        account.logger.logDebug(LanguageManager.trans("characterSelectionFrame"), LanguageManager.trans("characterSelected", char.name, char.level));
      }
    } else {
      account.logger.logError(LanguageManager.trans("characterSelectionFrame"), LanguageManager.trans("noCharactersFound"));
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

    account.network.sendMessageFree("kpiStartSession", {
      accountSessionId: account.data.login,
      isSubscriber: account.data.isSubscriber,
    });
    account.network.send("moneyGoultinesAmountRequest");
    account.network.sendMessageFree("QuestListRequestMessage");
    account.network.sendMessageFree("FriendsGetListMessage");
    account.network.sendMessageFree("IgnoredGetListMessage");
    account.network.sendMessageFree("SpouseGetInformationsMessage");
    account.network.send("bakSoftToHardCurrentRateRequest");
    account.network.send("bakHardToSoftCurrentRateRequest");
    account.network.send("restoreMysteryBox");
    account.network.sendMessageFree("ClientKeyMessage", {key: randomString(21)});
    account.network.sendMessageFree("GameContextCreateRequestMessage");
  }

  private async HandleGameContextCreateMessage(account: Account, message: any) {
    if (!account.framesData.initialized && message.context === 1) {
      await account.network.sendMessageFree("ObjectAveragePricesGetMessage");
      account.framesData.initialized = true;
    }
  }

  private async HandleCharacterSelectedForceMessage(account: Account, message: any) {
    await account.network.sendMessageFree("CharacterSelectedForceReadyMessage");
  }
}
