import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";
import CharacterCreationResultMessage from "@/protocol/network/messages/CharacterCreationResultMessage";
import CharacterNameSuggestionFailureMessage from "@/protocol/network/messages/CharacterNameSuggestionFailureMessage";
import CharacterNameSuggestionSuccessMessage from "@/protocol/network/messages/CharacterNameSuggestionSuccessMessage";
import CharacterSelectedForceMessage from "@/protocol/network/messages/CharacterSelectedForceMessage";
import CharacterSelectedSuccessMessage from "@/protocol/network/messages/CharacterSelectedSuccessMessage";
import CharactersListMessage from "@/protocol/network/messages/CharactersListMessage";
import GameContextCreateMessage from "@/protocol/network/messages/GameContextCreateMessage";
import { randomString } from "@/utils/Random";
import { isBlank } from "@/utils/String";

export default class CharacterSelectionFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "CharactersListMessage",
      this.HandleCharactersListMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterNameSuggestionSuccessMessage",
      this.HandleCharacterNameSuggestionSuccessMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterNameSuggestionFailureMessage",
      this.HandleCharacterNameSuggestionFailureMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterCreationResultMessage",
      this.HandleCharacterCreationResultMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterSelectedSuccessMessage",
      this.HandleCharacterSelectedSuccessMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterSelectedForceMessage",
      this.HandleCharacterSelectedForceMessage,
      this
    );
    Frames.dispatcher.register(
      "GameContextCreateMessage",
      this.HandleGameContextCreateMessage,
      this
    );
  }

  private async HandleCharactersListMessage(
    account: Account,
    message: CharactersListMessage
  ) {
    account.game.server.UpdateCharactersListMessage(message);

    if (account.accountConfig.characterCreation.create) {
      await account.extensions.characterCreation.UpdateCharactersListMessage(
        message
      );
      return;
    }

    if (message.characters.length > 0) {
      const char = isBlank(account.accountConfig.character)
        ? message.characters[0]
        : message.characters.find(
            c => c.name === account.accountConfig.character
          );

      if (char === undefined) {
        account.logger.logError(
          LanguageManager.trans("characterSelectionFrame"),
          `Character ${account.accountConfig.character} don't found!`
        );
      } else {
        await account.network.sendMessageFree("CharacterSelectionMessage", {
          id: char.id
        });
        account.logger.logDebug(
          LanguageManager.trans("characterSelectionFrame"),
          LanguageManager.trans("characterSelected", char.name, char.level)
        );
      }
    } else {
      account.logger.logError(
        LanguageManager.trans("characterSelectionFrame"),
        LanguageManager.trans("noCharactersFound")
      );
    }
  }

  private async HandleCharacterNameSuggestionSuccessMessage(
    account: Account,
    message: CharacterNameSuggestionSuccessMessage
  ) {
    account.extensions.characterCreation.UpdateCharacterNameSuggestionSuccessMessage(
      message
    );
  }

  private async HandleCharacterNameSuggestionFailureMessage(
    account: Account,
    message: CharacterNameSuggestionFailureMessage
  ) {
    account.extensions.characterCreation.UpdateCharacterNameSuggestionFailureMessage(
      message
    );
  }

  private async HandleCharacterCreationResultMessage(
    account: Account,
    message: CharacterCreationResultMessage
  ) {
    account.extensions.characterCreation.UpdateCharacterCreationResultMessage(
      message
    );
  }

  private async HandleCharacterSelectedSuccessMessage(
    account: Account,
    message: CharacterSelectedSuccessMessage
  ) {
    account.game.character.UpdateCharacterSelectedSuccessMessage(message);

    account.network.sendMessageFree("kpiStartSession", {
      accountSessionId: account.data.login,
      isSubscriber: account.data.isSubscriber
    });
    account.network.send("moneyGoultinesAmountRequest");
    account.network.sendMessageFree("QuestListRequestMessage");
    account.network.sendMessageFree("FriendsGetListMessage");
    account.network.sendMessageFree("IgnoredGetListMessage");
    account.network.sendMessageFree("SpouseGetInformationsMessage");
    account.network.send("bakSoftToHardCurrentRateRequest");
    account.network.send("bakHardToSoftCurrentRateRequest");
    account.network.send("restoreMysteryBox");
    account.network.sendMessageFree("ClientKeyMessage", {
      key: randomString(21)
    });
    account.network.sendMessageFree("GameContextCreateRequestMessage");
  }

  private async HandleGameContextCreateMessage(
    account: Account,
    message: GameContextCreateMessage
  ) {
    if (!account.framesData.initialized && message.context === 1) {
      await account.network.sendMessageFree("ObjectAveragePricesGetMessage");
      account.framesData.initialized = true;
    }
  }

  private async HandleCharacterSelectedForceMessage(
    account: Account,
    message: CharacterSelectedForceMessage
  ) {
    await account.network.sendMessageFree("CharacterSelectedForceReadyMessage");
  }
}
