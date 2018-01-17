import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import FighterStatsListMessage from "@protocol/network/messages/FighterStatsListMessage";
import GameActionFightDeathMessage from "@protocol/network/messages/GameActionFightDeathMessage";
import GameActionFightDispellableEffectMessage from "@protocol/network/messages/GameActionFightDispellableEffectMessage";
import GameActionFightLifePointsGainMessage from "@protocol/network/messages/GameActionFightLifePointsGainMessage";
import GameActionFightLifePointsLostMessage from "@protocol/network/messages/GameActionFightLifePointsLostMessage";
import GameActionFightNoSpellCastMessage from "@protocol/network/messages/GameActionFightNoSpellCastMessage";
import GameActionFightPointsVariationMessage from "@protocol/network/messages/GameActionFightPointsVariationMessage";
import GameActionFightSlideMessage from "@protocol/network/messages/GameActionFightSlideMessage";
import GameActionFightSpellCastMessage from "@protocol/network/messages/GameActionFightSpellCastMessage";
import GameActionFightSummonMessage from "@protocol/network/messages/GameActionFightSummonMessage";
import GameActionFightTeleportOnSameMapMessage from "@protocol/network/messages/GameActionFightTeleportOnSameMapMessage";
import GameEntitiesDispositionMessage from "@protocol/network/messages/GameEntitiesDispositionMessage";
import GameFightEndMessage from "@protocol/network/messages/GameFightEndMessage";
import GameFightJoinMessage from "@protocol/network/messages/GameFightJoinMessage";
import GameFightLeaveMessage from "@protocol/network/messages/GameFightLeaveMessage";
import GameFightNewRoundMessage from "@protocol/network/messages/GameFightNewRoundMessage";
import GameFightOptionStateUpdateMessage from "@protocol/network/messages/GameFightOptionStateUpdateMessage";
import GameFightPlacementPossiblePositionsMessage from "@protocol/network/messages/GameFightPlacementPossiblePositionsMessage";
import GameFightShowFighterMessage from "@protocol/network/messages/GameFightShowFighterMessage";
import GameFightShowFighterRandomStaticPoseMessage from "@protocol/network/messages/GameFightShowFighterRandomStaticPoseMessage";
import GameFightStartingMessage from "@protocol/network/messages/GameFightStartingMessage";
import GameFightStartMessage from "@protocol/network/messages/GameFightStartMessage";
import GameFightSynchronizeMessage from "@protocol/network/messages/GameFightSynchronizeMessage";
import GameFightTurnEndMessage from "@protocol/network/messages/GameFightTurnEndMessage";
import GameFightTurnReadyRequestMessage from "@protocol/network/messages/GameFightTurnReadyRequestMessage";
import GameFightTurnStartMessage from "@protocol/network/messages/GameFightTurnStartMessage";
import GameFightUpdateTeamMessage from "@protocol/network/messages/GameFightUpdateTeamMessage";
import GameMapMovementMessage from "@protocol/network/messages/GameMapMovementMessage";
import GameMapNoMovementMessage from "@protocol/network/messages/GameMapNoMovementMessage";
import SequenceEndMessage from "@protocol/network/messages/SequenceEndMessage";
import TextInformationMessage from "@protocol/network/messages/TextInformationMessage";
import {  sleep } from "@utils/Time";
import * as moment from "moment";

export default class FightFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("GameMapMovementMessage", this.HandleGameMapMovementMessage, this);
    this.account.dispatcher.register("GameMapNoMovementMessage", this.HandleGameMapNoMovementMessage, this);
    this.account.dispatcher.register("GameActionFightNoSpellCastMessage", this.HandleGameActionFightNoSpellCastMessage, this);
    this.account.dispatcher.register("GameFightPlacementPossiblePositionsMessage", this.HandleGameFightPlacementPossiblePositionsMessage, this);
    this.account.dispatcher.register("SequenceEndMessage", this.HandleSequenceEndMessage, this);
    this.account.dispatcher.register("GameFightTurnReadyRequestMessage", this.HandleGameFightTurnReadyRequestMessage, this);
    this.account.dispatcher.register("GameFightShowFighterRandomStaticPoseMessage", this.HandleGameFightShowFighterRandomStaticPoseMessage, this);
    this.account.dispatcher.register("GameFightNewRoundMessage", this.HandleGameFightNewRoundMessage, this);
    this.account.dispatcher.register("GameActionFightSpellCastMessage", this.HandleGameActionFightSpellCastMessage, this);
    this.account.dispatcher.register("GameFightEndMessage", this.HandleGameFightEndMessage, this);
    this.account.dispatcher.register("GameActionFightDispellableEffectMessage", this.HandleGameActionFightDispellableEffectMessage, this);
    this.account.dispatcher.register("GameFightTurnEndMessage", this.HandleGameFightTurnEndMessage, this);
    this.account.dispatcher.register("GameFightTurnStartMessage", this.HandleGameFightTurnStartMessage, this);
    this.account.dispatcher.register("GameFightLeaveMessage", this.HandleGameFightLeaveMessage, this);
    this.account.dispatcher.register("GameActionFightLifePointsGainMessage", this.HandleGameActionFightLifePointsGainMessage, this);
    this.account.dispatcher.register("GameActionFightLifePointsLostMessage", this.HandleGameActionFightLifePointsLostMessage, this);
    this.account.dispatcher.register("GameActionFightSummonMessage", this.HandleGameActionFightSummonMessage, this);
    this.account.dispatcher.register("GameActionFightSlideMessage", this.HandleGameActionFightSlideMessage, this);
    this.account.dispatcher.register("GameActionFightTeleportOnSameMapMessage", this.HandleGameActionFightTeleportOnSameMapMessage, this);
    this.account.dispatcher.register("GameActionFightDeathMessage", this.HandleGameActionFightDeathMessage, this);
    this.account.dispatcher.register("GameActionFightPointsVariationMessage", this.HandleGameActionFightPointsVariationMessage, this);
    this.account.dispatcher.register("FighterStatsListMessage", this.HandleFighterStatsListMessage, this);
    this.account.dispatcher.register("GameFightSynchronizeMessage", this.HandleGameFightSynchronizeMessage, this);
    this.account.dispatcher.register("GameEntitiesDispositionMessage", this.HandleGameEntitiesDispositionMessage, this);
    this.account.dispatcher.register("GameFightOptionStateUpdateMessage", this.HandleGameFightOptionStateUpdateMessage, this);
    this.account.dispatcher.register("GameFightUpdateTeamMessage", this.HandleGameFightUpdateTeamMessage, this);
    this.account.dispatcher.register("GameFightShowFighterMessage", this.HandleGameFightShowFighterMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
    this.account.dispatcher.register("GameFightStartMessage", this.HandleGameFightStartMessage, this);
    this.account.dispatcher.register("GameFightStartingMessage", this.HandleGameFightStartingMessage, this);
    this.account.dispatcher.register("GameFightJoinMessage", this.HandleGameFightJoinMessage, this);
  }

  private async HandleGameMapMovementMessage(account: Account, message: GameMapMovementMessage) {
    if (account.state === AccountStates.FIGHTING) {
      account.game.fight.UpdateGameMapMovementMessage(message);
      account.extensions.characterCreation.UpdateGameMapMovementMessage(message);
    }
  }

  private async HandleGameMapNoMovementMessage(account: Account, message: GameMapNoMovementMessage) {
    if (account.state !== AccountStates.FIGHTING) {
      return;
    }
    await account.extensions.fights.UpdateGameMapNoMovementMessage(message);
    // In case we get into a fight after we "tried" to move
    account.game.managers.movements.clear();
  }

  private async HandleGameActionFightNoSpellCastMessage(account: Account, message: GameActionFightNoSpellCastMessage) {
    account.extensions.fights.UpdateGameActionFightNoSpellCastMessage(message);
  }

  private async HandleGameFightPlacementPossiblePositionsMessage(account: Account, message: GameFightPlacementPossiblePositionsMessage) {
    account.game.fight.UpdateGameFightPlacementPossiblePositionsMessage(message);
    await account.extensions.fights.UpdateGameFightPlacementPossiblePositionsMessage(message);
  }

  private async HandleSequenceEndMessage(account: Account, message: SequenceEndMessage) {
    if (account.game.character.id === message.authorId) {
      await sleep(200 * account.extensions.fights.config.fightSpeed);
      await account.network.sendMessageFree("GameActionAcknowledgementMessage", {
        actionId: message.actionId,
        valid: true,
      });
    }
    await account.extensions.fights.UpdateSequenceEndMessage(message);
  }

  private async HandleGameFightTurnReadyRequestMessage(account: Account, message: GameFightTurnReadyRequestMessage) {
    await sleep(message.id === account.game.character.id ? 200 : 400 * account.extensions.fights.config.fightSpeed);
    await account.network.sendMessageFree("GameFightTurnReadyMessage", { isReady: true });
  }

  private async HandleGameFightShowFighterRandomStaticPoseMessage(account: Account, message: GameFightShowFighterRandomStaticPoseMessage) {
    this.HandleGameFightShowFighterMessage(account, message);
  }

  private async HandleGameFightNewRoundMessage(account: Account, message: GameFightNewRoundMessage) {
    account.game.fight.UpdateGameFightNewRoundMessage(message);
  }

  private async HandleGameActionFightSpellCastMessage(account: Account, message: GameActionFightSpellCastMessage) {
    account.game.fight.UpdateGameActionFightSpellCastMessage(message);
    account.extensions.characterCreation.UpdateGameActionFightSpellCastMessage(message);
  }

  private async HandleGameFightEndMessage(account: Account, message: GameFightEndMessage) {
    moment.locale(GlobalConfiguration.lang);
    const elapsed = moment.duration(message.duration);
    account.logger.logInfo("FightFrame", LanguageManager.trans("fightEnded", elapsed.minutes(), elapsed.seconds()));
    account.game.fight.UpdateGameFightEndMessage(message);
    await account.statistics.UpdateGameFightEndMessage(message);
  }

  private async HandleGameActionFightDispellableEffectMessage(account: Account, message: GameActionFightDispellableEffectMessage) {
    account.game.fight.UpdateGameActionFightDispellableEffectMessage(message);
  }

  private async HandleGameFightTurnEndMessage(account: Account, message: GameFightTurnEndMessage) {
    account.game.fight.UpdateGameFightTurnEndMessage(message);
  }

  private async HandleGameFightTurnStartMessage(account: Account, message: GameFightTurnStartMessage) {
    account.game.fight.UpdateGameFightTurnStartMessage(message);
  }

  private async HandleGameFightLeaveMessage(account: Account, message: GameFightLeaveMessage) {
    account.game.fight.UpdateGameFightLeaveMessage(message);
  }

  private async HandleGameActionFightLifePointsGainMessage(account: Account, message: GameActionFightLifePointsGainMessage) {
    account.game.fight.UpdateGameActionFightLifePointsGainMessage(message);
    const fighter = account.game.fight.getFighter(message.targetId);
    account.logger.logInfo((fighter as any).name, `+ ${message.delta} HP.`); // TODO: fix name
  }

  private async HandleGameActionFightLifePointsLostMessage(account: Account, message: GameActionFightLifePointsLostMessage) {
    account.game.fight.UpdateGameActionFightLifePointsLostMessage(message);
    const fighter = account.game.fight.getFighter(message.targetId);
    if (fighter) {
      const tmp = fighter.lifePoints === 0 ? " (mort)." : ".";
      account.logger.logInfo((fighter as any).name, `- ${message.loss} HP${tmp}`); // TODO: fix name
    }
  }

  private async HandleGameActionFightSummonMessage(account: Account, message: GameActionFightSummonMessage) {
    account.game.fight.UpdateGameActionFightSummonMessage(message);
  }

  private async HandleGameActionFightSlideMessage(account: Account, message: GameActionFightSlideMessage) {
    account.game.fight.UpdateGameActionFightSlideMessage(message);
  }

  private async HandleGameActionFightTeleportOnSameMapMessage(account: Account, message: GameActionFightTeleportOnSameMapMessage) {
    account.game.fight.UpdateGameActionFightTeleportOnSameMapMessage(message);
  }

  private async HandleGameActionFightDeathMessage(account: Account, message: GameActionFightDeathMessage) {
    account.game.fight.UpdateGameActionFightDeathMessage(message);
  }

  private async HandleGameActionFightPointsVariationMessage(account: Account, message: GameActionFightPointsVariationMessage) {
    account.game.fight.UpdateGameActionFightPointsVariationMessage(message);
  }

  private async HandleFighterStatsListMessage(account: Account, message: FighterStatsListMessage) {
    account.game.fight.UpdateFighterStatsListMessage(message);
    await account.network.sendMessageFree("GameActionAcknowledgementMessage", { valid: true, actionId: 0 });
  }

  private async HandleGameFightSynchronizeMessage(account: Account, message: GameFightSynchronizeMessage) {
    account.game.fight.UpdateGameFightSynchronizeMessage(message);
  }

  private async HandleGameEntitiesDispositionMessage(account: Account, message: GameEntitiesDispositionMessage) {
    account.game.fight.UpdateGameEntitiesDispositionMessage(message);
    await account.extensions.characterCreation.UpdateGameEntitiesDispositionMessage(message);
  }

  private async HandleGameFightOptionStateUpdateMessage(account: Account, message: GameFightOptionStateUpdateMessage) {
    account.game.fight.UpdateGameFightOptionStateUpdateMessage(message);
  }

  private async HandleGameFightUpdateTeamMessage(account: Account, message: GameFightUpdateTeamMessage) {
    account.game.fight.UpdateGameFightUpdateTeamMessage(message);
  }

  private async HandleGameFightShowFighterMessage(account: Account, message: GameFightShowFighterMessage) {
    account.game.fight.UpdateGameFightShowFighterMessage(message);
    await account.extensions.fights.UpdateGameFightShowFighterMessage(message);
  }

  private async HandleTextInformationMessage(account: Account, message: TextInformationMessage) {
    account.game.fight.UpdateTextInformationMessage(message);
  }

  private async HandleGameFightStartMessage(account: Account, message: GameFightStartMessage) {
    account.logger.logInfo("", "Le combat commence!");
    account.game.fight.UpdateGameFightStartMessage(message);
  }

  private async HandleGameFightStartingMessage(account: Account, message: GameFightStartingMessage) {
    account.extensions.characterCreation.UpdateGameFightStartingMessage(message);
  }

  private async HandleGameFightJoinMessage(account: Account, message: GameFightJoinMessage) {
    account.game.map.UpdateGameFightJoinMessage(message);
    account.game.fight.UpdateGameFightJoinMessage(message);
  }
}
