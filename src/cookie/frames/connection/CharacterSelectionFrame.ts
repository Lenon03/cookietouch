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
  }

  private HandleCharactersListMessage(account: Account, data: any) {
    account.network.sendMessage("CharacterSelectionMessage", {
      id: data.characters[0].id,
    });
  }

  private HandleCharacterSelectedSuccessMessage(account: Account, data: any) {
    account.game.character.infos = data.infos;

    account.network.sendMessage("kpiStartSession", {
      accountSessionId: account.login,
      isSubscriber: account.subscriptionEndDate !== 0,
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
}
