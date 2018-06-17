import LanguageManager from "@/configurations/language/LanguageManager";
import { DataTypes } from "@/protocol/data/DataTypes";
import Account from "@account";
import DataManager from "@protocol/data";
import Achievements from "@protocol/data/classes/Achievements";

export default class AchievementsFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "AchievementRewardSuccessMessage",
      this.HandleAchievementRewardSuccessMessage,
      this
    );
    this.account.dispatcher.register(
      "AchievementFinishedMessage",
      this.HandleAchievementFinishedMessage,
      this
    );
    this.account.dispatcher.register(
      "AchievementListMessage",
      this.HandleAchievementListMessage,
      this
    );
  }

  private async HandleAchievementRewardSuccessMessage(
    account: Account,
    message: any
  ) {
    account.statistics.UpdateAchievementRewardSuccessMessage(message);
    const achievementResp = await DataManager.get<Achievements>(
      DataTypes.Achievements,
      message.achievementId
    );
    const a = achievementResp[0].object;
    account.logger.logInfo(
      "AchievementsFrame",
      LanguageManager.trans("achievementReward", a.nameId, a.points)
    );
  }

  private async HandleAchievementFinishedMessage(
    account: Account,
    message: any
  ) {
    if (!account.config.acceptAchievements) {
      return;
    }

    account.network.sendMessageFree("AchievementRewardRequestMessage", {
      achievementId: message.id
    });
  }

  private async HandleAchievementListMessage(account: Account, message: any) {
    if (!account.config.acceptAchievements) {
      return;
    }

    for (const achiv of message.rewardableAchievements) {
      account.network.sendMessageFree("AchievementRewardRequestMessage", {
        achievementId: achiv.id
      });
    }
  }
}
