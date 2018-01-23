import LanguageManager from "@/configurations/language/LanguageManager";
import MapPoint from "@/core/pathfinder/MapPoint";
import { DataTypes } from "@/protocol/data/DataTypes";
import Account from "@account";
import DataManager from "@protocol/data";
import SpellLevels from "@protocol/data/classes/SpellLevels";
import Spells from "@protocol/data/classes/Spells";
import { FightOptionsEnum } from "@protocol/enums/FightOptionsEnum";
import { SequenceTypeEnum } from "@protocol/enums/SequenceTypeEnum";
import { TeamEnum } from "@protocol/enums/TeamEnum";
import GameActionFightNoSpellCastMessage from "@protocol/network/messages/GameActionFightNoSpellCastMessage";
import GameFightPlacementPossiblePositionsMessage from "@protocol/network/messages/GameFightPlacementPossiblePositionsMessage";
import GameFightShowFighterMessage from "@protocol/network/messages/GameFightShowFighterMessage";
import GameMapNoMovementMessage from "@protocol/network/messages/GameMapNoMovementMessage";
import SequenceEndMessage from "@protocol/network/messages/SequenceEndMessage";
import IClearable from "@utils/IClearable";
import { sleep } from "@utils/Time";
import { List } from "linqts";
import TutorialHelper from "../characterCreator/TutorialHelper";
import { BlockSpectatorScenarios } from "./configuration/enums/BlockSpectatorScenarios";
import { FightStartPlacement } from "./configuration/enums/FightStartPlacement";
import { FightTactics } from "./configuration/enums/FightTactics";
import FightsConfiguration from "./configuration/FightsConfiguration";
import Spell from "./configuration/Spell";
import { SpellCastingResults } from "./SpellCastingResults";
import SpellsManager from "./SpellsManager";
import FightsUtility from "./utility/FightsUtility";

export default class FightsExtension implements IClearable {
  public config: FightsConfiguration;

  get spells() {
    return this.account.extensions.characterCreation.isDoingTutorial
      ? TutorialHelper.baseSpells.getValue(this.account.game.character.breed)
      : new List(this.config.spells);
  }

  private account: Account;
  private awaitingSequenceEnd: boolean;
  private _endTurn: boolean;
  private spellCasted: boolean;
  private spellIndex: number;
  private spellsManager: SpellsManager;
  private turnId: number;
  private utility: FightsUtility;

  constructor(account: Account) {
    this.account = account;

    this.spellsManager = new SpellsManager(account);
    this.utility = new FightsUtility(account);
    this.config = new FightsConfiguration(account);

    this.setEvents();
  }

  public clear() {
    this.turnId = 0;
  }

  public async UpdateGameActionFightNoSpellCastMessage(message: GameActionFightNoSpellCastMessage) {
    try {
      if (this.spellIndex >= this.spells.Count()) {
        await this.endTurn();
      } else {
        await this.processNextSpell(this.spells.ElementAt(this.spellIndex));
      }
    } catch (e) {
      //
    }
  }

  public async UpdateGameMapNoMovementMessage(message: GameMapNoMovementMessage) {
    // await this.finishTurn(400);
  }

  public async UpdateSequenceEndMessage(message: SequenceEndMessage) {
    if (!this.account.game.fight.isOurTurn || message.authorId !== this.account.game.character.id) {
      return;
    }
    // If all the enemies are dead, avoid doing something
    if (this.account.game.fight.aliveEnemiesCount === 0) {
      return;
    }
    // If it's the end of the turn
    if (this._endTurn && message.sequenceType === SequenceTypeEnum.SEQUENCE_MOVE) {
      await this.finishTurn(400);
      return;
    }
    if (this.awaitingSequenceEnd) {
      this.awaitingSequenceEnd = false;
    } else {
      return;
    }
    // Otherwise handle the spells
    await sleep(400);
    await this.processSpells();
  }

  public async UpdateGameFightPlacementPossiblePositionsMessage(message: GameFightPlacementPossiblePositionsMessage) {
    // TODO: Find a better way...
    // Wait a little to make sure all the enemies are in the fight
    await sleep(1000);
    // Check if we should lock the fight
    if (this.config.lockFight) {
      await this.account.game.fight.toggleOption(FightOptionsEnum.FIGHT_OPTION_SET_CLOSED);
    }
    await sleep(300);
    // Check if we should block spectator mode
    if (this.config.blockSpectatorScenario === BlockSpectatorScenarios.ALWAYS) {
      await this.account.game.fight.toggleOption(FightOptionsEnum.FIGHT_OPTION_SET_SECRET);
    }
    await sleep(300);
    const allies = new List(this.account.game.fight.allies);
    const selectAllies = allies.Select((a) => a.cellId);
    const defenders = new List(message.positionsForDefenders);
    const challengers = new List(message.positionsForChallengers);
    const possiblePositions = this.account.game.fight.playedFighter.team === TeamEnum.TEAM_CHALLENGER
      ? challengers.Except(selectAllies) : defenders.Except(selectAllies);
    // Approach Monster
    if (!await this.tryApproachingMonster(possiblePositions.ToArray())) {
      if (!await this.tryApproachingForSpell(possiblePositions.ToArray())) {
        if (this.config.startPlacement !== FightStartPlacement.STAY_STILL) {
          const cellId = this.utility.getNearestOrFarthestCell(
            this.config.startPlacement === FightStartPlacement.CLOSE_TO_ENEMIES, possiblePositions.ToArray());
          // If we're not already close
          if (cellId !== this.account.game.fight.playedFighter.cellId) {
            await this.account.network.sendMessageFree("GameFightPlacementPositionRequestMessage", { cellId });
          }
        }
      }
    }
    // If this account is a group chief, wait for the group members to join (or for the fight to start :/)
    if (this.account.hasGroup && this.account.isGroupChief) {
      // await this.account.group.waitForMembersToJoinFight();
      // Group special case: If one of the members didn't join, and the fight started, there is no need to send ready message
      if (this.account.game.fight.isFightStarted) {
        return;
      }
    }
    await sleep(300);
    this.account.network.sendMessageFree("GameFightReadyMessage", { isReady: true });
  }

  public async UpdateGameFightShowFighterMessage(message: GameFightShowFighterMessage) {
    // Avoid kicking monsters or ourselves...
    if (this.account.game.fight.allies.find((a) => a.contextualId === message.informations.contextualId) === undefined) {
      return;
    }

    if (this.account.hasGroup && this.account.isGroupChief) {
      if (!this.account.group.isGroupMember(message.informations.contextualId)) {
        await sleep(800);
        await this.account.network.sendMessageFree("GameContextKickMessage", { targetId: message.informations.contextualId });
        // If this person took a member's place, send a group signal so that the member joins again
        this.account.group.signalMembersToJoinFight();
      }
    }
  }

  private setEvents() {
    this.account.game.fight.TurnStarted.on(this.turnStarted.bind(this));
    this.account.game.fight.TurnEnded.on(this.turnEnded.bind(this));
    this.account.game.fight.FightJoined.on(this.fightJoined.bind(this));
    this.account.game.fight.SpectatorJoined.on(this.spectatorJoined.bind(this));
  }

  private fightJoined() {
    this.turnId = 0;
    this.spells.ForEach((s) => {
      s.lastTurn = 0;
      s.remainingRelaunchs = s.relaunchs;
    });
  }

  private async turnStarted() {
    this.turnId++;
    this.spellIndex = 0;
    this._endTurn = false;
    this.spellCasted = false;
    this.awaitingSequenceEnd = false;

    // For example mules that just need to move (or not) and pass turn
    // Also end turn if there are no visible monsters
    if (this.spells.Count() === 0 || !(this.account.game.fight.enemies.length > 0)) {
      await this.endTurn();
      return;
    }
    await this.processSpells();
  }

  private turnEnded() {
    this.account.logger.logInfo(LanguageManager.trans("fightsExtension"), LanguageManager.trans("turnEnded"));
  }

  private async spectatorJoined() {
    if (this.config.blockSpectatorScenario === BlockSpectatorScenarios.WHEN_SOMEONE_JOINS) {
      await this.account.game.fight.toggleOption(FightOptionsEnum.FIGHT_OPTION_SET_SECRET);
    }
  }

  private async endTurn() {
    if (!this.account.game.fight.isOurTurn) {
      return;
    }
    if (this.config.tactic === FightTactics.PASSIVE) {
      await this.finishTurn(400);
      return;
    }
    // If we're h2h then just avoid this
    if (this.account.game.fight.isHandToHandWithAnEnemy() && this.config.tactic === FightTactics.AGGRESSIVE) {
      await this.finishTurn(400);
      return;
    }
    if (this.account.game.fight.playedFighter.movementPoints > 0 && this.account.game.fight.enemies.length > 0) {
      // If no spell casted, approach event if the tactic is fugitive
      // Also if distance to the nearest enemy is >= maxCells
      const nearest = this.config.tactic === FightTactics.AGGRESSIVE ||
        (this.config.approachWhenNoSpellCasted ||
        this.account.extensions.characterCreation.isDoingTutorial) && !this.spellCasted ||
        MapPoint.fromCellId(this.account.game.fight.getNearestEnemy().cellId)
        .distanceToCell(MapPoint.fromCellId(this.account.game.fight.playedFighter.cellId)) >=
        this.config.maxCells;
      const node = this.utility.getNearestOrFarthestEndMoveNode(nearest, this.config.tactic === FightTactics.FUGITIVE
        || this.config.baseApproachAllMonsters);
      if (node !== null) {
        this._endTurn = true;
        await this.account.game.managers.movements.moveToCellInFight(node);
        return;
      }
    }
    await this.finishTurn(400);
  }

  private async processSpells() {
    if (this.account.isFighting === false || this.spells.Count() === 0) {
      return;
    }
    // If we finished all the spells
    if (this.spellIndex >= this.spells.Count()) {
      await this.endTurn();
      return;
    }
    // Otherwise handle the current spell
    const currentSpell = this.spells.ElementAt(this.spellIndex);
    // If we have no more relaunchs, go to the next spellLevel
    if (currentSpell.remainingRelaunchs === 0) {
      await this.processNextSpell(currentSpell, true);
      return;
    }
    // Otherwise handle the spell
    // Check if we can cast this spell thist turn
    if (!(this.turnId === 1 || currentSpell.lastTurn === 0 || currentSpell.turns === 1 ||
      this.turnId === currentSpell.lastTurn + currentSpell.turns)) {
      await this.processNextSpell(currentSpell);
    }
    const result = await this.spellsManager.manageSpell(currentSpell);
    switch (result) {
      // If we failed to cast the spell, go to the next one
      case SpellCastingResults.NOT_CASTED:
        // Without setting the lastTurn property
        await this.processNextSpell(currentSpell);
        break;
      case SpellCastingResults.CASTED:
        this.spellCasted = true;
        currentSpell.remainingRelaunchs--;
        this.awaitingSequenceEnd = true;
        break;
      case SpellCastingResults.MOVED:
        this.awaitingSequenceEnd = true;
        break;
    }
  }

  private async processNextSpell(currentSpell: Spell, updateLastTurn = false) {
    if (this.account.isFighting === false) {
      return;
    }
    currentSpell.remainingRelaunchs = currentSpell.relaunchs;
    this.spellIndex++;
    if (updateLastTurn) {
      currentSpell.lastTurn = this.turnId;
    }
    await this.processSpells();
  }

  private async finishTurn(delay: number) {
    await sleep(delay);
    await this.account.network.sendMessageFree("GameFightTurnFinishMessage");
  }

  private async tryApproachingForSpell(possiblePlacements: number[]): Promise<boolean> {
    if (this.config.spellToApproach === -1) {
      return false;
    }
    const spellResp = await DataManager.get<Spells>(DataTypes.Spells, this.config.spellToApproach);
    const spell = spellResp[0].object;
    const spellLevelResp = await DataManager.get<SpellLevels>
      (DataTypes.SpellLevels, spell.spellLevels[this.account.game.character.getSpell(spell.id).level - 1]);
    const spellLevel = spellLevelResp[0].object;

    // Check if we can cast the spell from our current position
    if (this.utility.spellIsHittingAnyEnemy(this.account.game.fight.playedFighter.cellId, spellLevel)) {
      return true;
    }
    // Otherwise check for the other cells
    for (const t of possiblePlacements) {
      // Avoid re-checking ou current position
      if (t === this.account.game.fight.playedFighter.cellId) {
        continue;
      }
      if (this.utility.spellIsHittingAnyEnemy(t, spellLevel)) {
        await this.account.network.sendMessageFree("GameFightPlacementPositionRequestMessage", { cellId: t });
        return true;
      }
    }
    return false;
  }

  private async tryApproachingMonster(possiblePlacements: number[]): Promise<boolean> {
    if (this.config.monsterToApproach === -1) {
      return false;
    }
    const monster = this.account.game.fight.monsters.find((m) => m.creatureGenericId === this.config.monsterToApproach);
    if (monster === undefined) {
      return false;
    }
    // The monster to approach is in the fight !
    let cellId = -1;
    let distance = -1;

    for (const cell of possiblePlacements) {
      const tempDistance = MapPoint.fromCellId(monster.cellId).distanceToCell(MapPoint.fromCellId(cell));
      if (cellId === -1 || tempDistance < distance) {
        cellId = cell;
        distance = tempDistance;
      }
    }

    // If we're not already close
    if (cellId !== this.account.game.fight.playedFighter.cellId) {
      await this.account.network.sendMessageFree("GameFightPlacementPositionRequestMessage", { cellId });
    }

    return true;
  }
}
