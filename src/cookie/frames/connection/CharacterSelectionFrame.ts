import Account from "../../Account";
import { randomString } from "../../utils/Random";

export default class CharacterSelectionFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("CharactersListMessage", this.HandleCharactersListMessage, this);
    this.account.dispatcher.register("CharacterSelectedSuccessMessage",
      this.HandleCharacterSelectedSuccessMessage, this);
    this.account.dispatcher.register("GameContextCreateMessage",
      this.HandleGameContextCreateMessage, this);
  }

  private async HandleCharactersListMessage(account: Account, message: any) {
    account.network.sendMessage("CharacterSelectionMessage", {
      id: message.characters[0].id,
    });
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
}
