import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";
import CharacterExperienceGainMessage from "@/protocol/network/messages/CharacterExperienceGainMessage";
import CharacterLevelUpMessage from "@/protocol/network/messages/CharacterLevelUpMessage";
import CharacterStatsListMessage from "@/protocol/network/messages/CharacterStatsListMessage";
import EmotePlayMessage from "@/protocol/network/messages/EmotePlayMessage";
import GameRolePlayPlayerLifeStatusMessage from "@/protocol/network/messages/GameRolePlayPlayerLifeStatusMessage";
import JobDescriptionMessage from "@/protocol/network/messages/JobDescriptionMessage";
import JobExperienceMultiUpdateMessage from "@/protocol/network/messages/JobExperienceMultiUpdateMessage";
import JobExperienceUpdateMessage from "@/protocol/network/messages/JobExperienceUpdateMessage";
import LifePointsRegenBeginMessage from "@/protocol/network/messages/LifePointsRegenBeginMessage";
import LifePointsRegenEndMessage from "@/protocol/network/messages/LifePointsRegenEndMessage";
import PlayerStatusUpdateMessage from "@/protocol/network/messages/PlayerStatusUpdateMessage";
import SpellListMessage from "@/protocol/network/messages/SpellListMessage";
import SpellUpgradeSuccessMessage from "@/protocol/network/messages/SpellUpgradeSuccessMessage";
import UpdateLifePointsMessage from "@/protocol/network/messages/UpdateLifePointsMessage";

export default class CharacterFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "EmotePlayMessage",
      this.HandleEmotePlayMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterExperienceGainMessage",
      this.HandleCharacterExperienceGainMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterStatsListMessage",
      this.HandleCharacterStatsListMessage,
      this
    );
    Frames.dispatcher.register(
      "CharacterLevelUpMessage",
      this.HandleCharacterLevelUpMessage,
      this
    );
    Frames.dispatcher.register(
      "UpdateLifePointsMessage",
      this.HandleUpdateLifePointsMessage,
      this
    );
    Frames.dispatcher.register(
      "GameRolePlayPlayerLifeStatusMessage",
      this.HandleGameRolePlayPlayerLifeStatusMessage,
      this
    );
    Frames.dispatcher.register(
      "PlayerStatusUpdateMessage",
      this.HandlePlayerStatusUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "LifePointsRegenBeginMessage",
      this.HandleLifePointsRegenBeginMessage,
      this
    );
    Frames.dispatcher.register(
      "LifePointsRegenEndMessage",
      this.HandleLifePointsRegenEndMessage,
      this
    );
    Frames.dispatcher.register(
      "SpellListMessage",
      this.HandleSpellListMessage,
      this
    );
    Frames.dispatcher.register(
      "SpellUpgradeSuccessMessage",
      this.HandleSpellUpgradeSuccessMessage,
      this
    );
    Frames.dispatcher.register(
      "JobDescriptionMessage",
      this.HandleJobDescriptionMessage,
      this
    );
    Frames.dispatcher.register(
      "JobExperienceMultiUpdateMessage",
      this.HandleJobExperienceMultiUpdateMessage,
      this
    );
    Frames.dispatcher.register(
      "JobExperienceUpdateMessage",
      this.HandleJobExperienceUpdateMessage,
      this
    );
  }

  private async HandleEmotePlayMessage(
    account: Account,
    message: EmotePlayMessage
  ) {
    account.game.character.UpdateEmotePlayMessage(message);
  }

  private async HandleCharacterExperienceGainMessage(
    account: Account,
    message: CharacterExperienceGainMessage
  ) {
    account.statistics.UpdateCharacterExperienceGainMessage(message);
    account.game.character.stats.UpdateCharacterExperienceGainMessage(message);
    account.logger.logDebug(
      LanguageManager.trans("characterFrame"),
      LanguageManager.trans("experienceGain", message.experienceCharacter)
    );
  }

  private async HandleCharacterStatsListMessage(
    account: Account,
    message: CharacterStatsListMessage
  ) {
    account.game.character.UpdateCharacterStatsListMessage(message);
  }

  private async HandleCharacterLevelUpMessage(
    account: Account,
    message: CharacterLevelUpMessage
  ) {
    account.statistics.UpdateCharacterLevelUpMessage(message);
    account.game.character.UpdateCharacterLevelUpMessage(message);
    account.logger.logDebug(
      LanguageManager.trans("characterFrame"),
      LanguageManager.trans("levelUp")
    );
  }

  private async HandleUpdateLifePointsMessage(
    account: Account,
    message: UpdateLifePointsMessage
  ) {
    account.game.character.stats.UpdateUpdateLifePointsMessage(message);
  }

  private async HandleGameRolePlayPlayerLifeStatusMessage(
    account: Account,
    message: GameRolePlayPlayerLifeStatusMessage
  ) {
    account.game.character.UpdateGameRolePlayPlayerLifeStatusMessage(message);
  }

  private async HandlePlayerStatusUpdateMessage(
    account: Account,
    message: PlayerStatusUpdateMessage
  ) {
    account.game.character.UpdatePlayerStatusUpdateMessage(message);
  }

  private async HandleLifePointsRegenBeginMessage(
    account: Account,
    message: LifePointsRegenBeginMessage
  ) {
    account.game.character.UpdateLifePointsRegenBeginMessage(message);
  }

  private async HandleLifePointsRegenEndMessage(
    account: Account,
    message: LifePointsRegenEndMessage
  ) {
    account.game.character.UpdateLifePointsRegenEndMessage(message);

    if (message.lifePointsGained > 0) {
      account.logger.logDebug(
        LanguageManager.trans("characterFrame"),
        LanguageManager.trans("lifePointsGained", message.lifePointsGained)
      );
    }

    account.game.character.stats.UpdateLifePointsRegenEndMessage(message);
  }

  private async HandleSpellListMessage(
    account: Account,
    message: SpellListMessage
  ) {
    account.game.character.UpdateSpellListMessage(message);
  }

  private async HandleSpellUpgradeSuccessMessage(
    account: Account,
    message: SpellUpgradeSuccessMessage
  ) {
    account.game.character.UpdateSpellUpgradeSuccessMessage(message);
  }

  private async HandleJobDescriptionMessage(
    account: Account,
    message: JobDescriptionMessage
  ) {
    account.game.character.jobs.UpdateJobDescriptionMessage(message);
  }

  private async HandleJobExperienceMultiUpdateMessage(
    account: Account,
    message: JobExperienceMultiUpdateMessage
  ) {
    await account.game.character.jobs.UpdateJobExperienceMultiUpdateMessage(
      message
    );
  }

  private async HandleJobExperienceUpdateMessage(
    account: Account,
    message: JobExperienceUpdateMessage
  ) {
    await account.game.character.jobs.UpdateJobExperienceUpdateMessage(message);
  }
}
