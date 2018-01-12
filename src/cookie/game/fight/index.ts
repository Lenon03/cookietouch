import Pathfinder from "@/core/pathfinder";
import Dofus1Line from "@/core/pathfinder/Dofus1Line";
import MapPoint from "@/core/pathfinder/MapPoint";
import SpellShapes from "@/core/pathfinder/shapes";
import GameActionFightCastRequestMessage from "@/protocol/network/messages/GameActionFightCastRequestMessage";
import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import DataManager from "@protocol/data";
import SpellLevels from "@protocol/data/classes/SpellLevels";
import Spells from "@protocol/data/classes/Spells";
import { FightOptionsEnum } from "@protocol/enums/FightOptionsEnum";
import { FightTypeEnum } from "@protocol/enums/FightTypeEnum";
import { GameActionFightInvisibilityStateEnum } from "@protocol/enums/GameActionFightInvisibilityStateEnum";
import FighterStatsListMessage from "@protocol/network/messages/FighterStatsListMessage";
import GameActionFightDeathMessage from "@protocol/network/messages/GameActionFightDeathMessage";
import GameActionFightDispellableEffectMessage from "@protocol/network/messages/GameActionFightDispellableEffectMessage";
import GameActionFightLifePointsGainMessage from "@protocol/network/messages/GameActionFightLifePointsGainMessage";
import GameActionFightLifePointsLostMessage from "@protocol/network/messages/GameActionFightLifePointsLostMessage";
import GameActionFightPointsVariationMessage from "@protocol/network/messages/GameActionFightPointsVariationMessage";
import GameActionFightSlideMessage from "@protocol/network/messages/GameActionFightSlideMessage";
import GameActionFightSpellCastMessage from "@protocol/network/messages/GameActionFightSpellCastMessage";
import GameActionFightSummonMessage from "@protocol/network/messages/GameActionFightSummonMessage";
import GameActionFightTeleportOnSameMapMessage from "@protocol/network/messages/GameActionFightTeleportOnSameMapMessage";
import GameAction from "@protocol/network/messages/GameActionFightTeleportOnSameMapMessage";
import GameEntitiesDispositionMessage from "@protocol/network/messages/GameEntitiesDispositionMessage";
import GameFightEndMessage from "@protocol/network/messages/GameFightEndMessage";
import GameFightJoinMessage from "@protocol/network/messages/GameFightJoinMessage";
import GameFightLeaveMessage from "@protocol/network/messages/GameFightLeaveMessage";
import GameFightNewRoundMessage from "@protocol/network/messages/GameFightNewRoundMessage";
import GameFightOptionStateUpdateMessage from "@protocol/network/messages/GameFightOptionStateUpdateMessage";
import GameFightPlacementPossiblePositionsMessage from "@protocol/network/messages/GameFightPlacementPossiblePositionsMessage";
import GameFightShowFighterMessage from "@protocol/network/messages/GameFightShowFighterMessage";
import GameFightStartMessage from "@protocol/network/messages/GameFightStartMessage";
import GameFightSynchronizeMessage from "@protocol/network/messages/GameFightSynchronizeMessage";
import GameFightTurnEndMessage from "@protocol/network/messages/GameFightTurnEndMessage";
import GameFightTurnStartMessage from "@protocol/network/messages/GameFightTurnStartMessage";
import GameFightUpdateTeamMessage from "@protocol/network/messages/GameFightUpdateTeamMessage";
import GameMapMovementMessage from "@protocol/network/messages/GameMapMovementMessage";
import TextInformationMessage from "@protocol/network/messages/TextInformationMessage";
import FightTemporaryBoostEffect from "@protocol/network/types/FightTemporaryBoostEffect";
import FightTemporaryBoostStateEffect from "@protocol/network/types/FightTemporaryBoostStateEffect";
import GameFightCharacterInformations from "@protocol/network/types/GameFightCharacterInformations";
import GameFightFighterInformations from "@protocol/network/types/GameFightFighterInformations";
import GameFightMonsterInformations from "@protocol/network/types/GameFightMonsterInformations";
import Dictionary from "@utils/Dictionary";
import IClearable from "@utils/IClearable";
import LiteEvent from "@utils/LiteEvent";
import { List } from "linqts";
import FighterEntry from "./fighters/FighterEntry";
import FightMonsterEntry from "./fighters/FightMonsterEntry";
import FightPlayerEntry from "./fighters/FightPlayerEntry";
import { SpellInabilityReasons } from "./SpellInabilityReasons";

export default class Fight implements IClearable {
  public type: FightTypeEnum;
  public options: FightOptionsEnum[];
  public isFightStarted: boolean;
  public playedFighter: FightPlayerEntry = null;
  public isOurTurn: boolean;
  public roundNumber: number;
  public positionsForChallengers = new List<number>();
  public positionsForDefenders = new List<number>();
  public fightId: number;

  get allies() {
    return this._allies.values().filter((a) => a.alive);
  }

  get enemies() {
    return this._enemies.values().filter((e) => e.alive && e.stats.invisibilityState !== GameActionFightInvisibilityStateEnum.INVISIBLE);
  }

  get monsters() {
    return this._enemies.values().map((a) => a as FightMonsterEntry);
  }

  get fighters() {
    return this._fighters.values().filter((a) => a.alive);
  }

  get invocationsCount() {
    return this.fighters.filter((f) => f.stats.summoner === this.playedFighter.contextualId).length;
  }

  get aliveEnemiesCount() {
    return this.enemies.filter((e) => e.alive).length;
  }

  get occupiedCells() {
    return this.fighters.map((f) => f.cellId);
  }

  get weakestEnemy(): FighterEntry {
    let lp = -1;
    let enemy: FighterEntry = null;

    for (const enemyEntry of this.enemies) {
      if (!enemyEntry.alive) {
        continue;
      }

      if (lp === -1 || enemyEntry.lifePercent < lp) {
        lp = enemyEntry.lifePercent;
        enemy = enemyEntry;
      }
    }

    return enemy;
  }

  get weakestAlly(): FighterEntry {
    let lp = -1;
    let ally: FighterEntry = null;

    for (const allyEntry of this.allies) {
      if (!allyEntry.alive) {
        continue;
      }

      if (lp === -1 || allyEntry.lifePercent < lp) {
        lp = allyEntry.lifePercent;
        ally = allyEntry;
      }
    }

    return ally;
  }

  private account: Account;

  private _allies: Dictionary<number, FighterEntry>;
  private _effectsDurations: Dictionary<number, number>;
  private _enemies: Dictionary<number, FighterEntry>;
  private _fighters: Dictionary<number, FighterEntry>;
  private _spellsIntervals: Dictionary<number, number>;
  private _totalSpellLaunches: Dictionary<number, number>;
  private _totalSpellLaunchesInCells: Dictionary<number, Dictionary<number, number>>;

  public get FightJoined() { return this.onFightJoined.expose(); }
  private readonly onFightJoined = new LiteEvent<void>();
  public get FightIDReceived() { return this.onFightIDReceived.expose(); }
  private readonly onFightIDReceived = new LiteEvent<void>();
  public get FightStarted() { return this.onFightStarted.expose(); }
  private readonly onFightStarted = new LiteEvent<void>();
  public get FightEnded() { return this.onFightEnded.expose(); }
  private readonly onFightEnded = new LiteEvent<void>();
  public get SpectatorJoined() { return this.onSpectatorJoined.expose(); }
  private readonly onSpectatorJoined = new LiteEvent<void>();
  public get TurnStarted() { return this.onTurnStarted.expose(); }
  private readonly onTurnStarted = new LiteEvent<void>();
  public get TurnEnded() { return this.onTurnEnded.expose(); }
  private readonly onTurnEnded = new LiteEvent<void>();
  public get FightersUpdated() { return this.onFightersUpdated.expose(); }
  private readonly onFightersUpdated = new LiteEvent<void>();
  public get FightersStatsUpdated() { return this.onFightersStatsUpdated.expose(); }
  private readonly onFightersStatsUpdated = new LiteEvent<void>();
  public get PossiblePositionsReceived() { return this.onPossiblePositionsReceived.expose(); }
  private readonly onPossiblePositionsReceived = new LiteEvent<void>();
  public get PlayerFighterMoving() { return this.onPlayerFighterMoving.expose(); }
  private readonly onPlayerFighterMoving = new LiteEvent<number[]>();

  constructor(account: Account) {
    this.account = account;

    this._allies = new Dictionary<number, FighterEntry>();
    this._effectsDurations = new Dictionary<number, number>();
    this._enemies = new Dictionary<number, FighterEntry>();
    this._fighters = new Dictionary<number, FighterEntry>();
    this._spellsIntervals = new Dictionary<number, number>();
    this._totalSpellLaunches = new Dictionary<number, number>();
    this._totalSpellLaunchesInCells = new Dictionary<number, Dictionary<number, number>>();
    this.options = [];
  }

  public clear() {
    this._allies = new Dictionary<number, FighterEntry>();
    this._effectsDurations = new Dictionary<number, number>();
    this._enemies = new Dictionary<number, FighterEntry>();
    this._fighters = new Dictionary<number, FighterEntry>();
    this._spellsIntervals = new Dictionary<number, number>();
    this._totalSpellLaunches = new Dictionary<number, number>();
    this._totalSpellLaunchesInCells = new Dictionary<number, Dictionary<number, number>>();

    this.isFightStarted = false;
    this.options = [];
    this.playedFighter = null;
    this.isOurTurn = false;
    this.roundNumber = 0;
    this.fightId = 0;
    this.positionsForChallengers = new List<number>();
    this.positionsForDefenders = new List<number>();
  }

  public async toggleOption(option: FightOptionsEnum) {
    if (this.account.state !== AccountStates.FIGHTING) {
      return;
    }

    if (!this.options.includes(option)) {
      await this.account.network.sendMessageFree("GameFightOptionToggleMessage", { option });
    }
  }

  public async launchSpell(spellId: number, cellId: number) {
    if (this.account.state !== AccountStates.FIGHTING) {
      return;
    }

    // TODO: Check why DT always sends CastRequest
    // if (this.getFighterInCell(cellId) !== null) {
    //   await this.account.network.sendMessageFree("GameActionFightCastOnTargetRequestMessage", {
    //     spellId,
    //     targetId: cellId,
    //   });
    // } else {
    // await this.account.network.sendMessageFree("GameActionFightCastRequestMessage", { spellId, cellId });
    await this.account.network.sendMessage(new GameActionFightCastRequestMessage(spellId, cellId));
    // }
  }

  public hasState(stateId: number): boolean {
    return this._effectsDurations.containsKey(stateId);
  }

  public getFighter(id: number): FighterEntry {
    if (this.playedFighter !== null && this.playedFighter.contextualId === id) {
      return this.playedFighter;
    }

    return this._fighters.getValue(id);
  }

  public getFighterInCell(cellId: number): FighterEntry {
    if (this.playedFighter !== null && this.playedFighter.cellId === cellId) {
      return this.playedFighter;
    }
    const tmp = this.fighters.find((f) => f.alive && f.cellId === cellId);
    return tmp === undefined ? null : tmp;
  }

  public isCellFree(cellId: number): boolean {
    return this.getFighterInCell(cellId) === null;
  }

  public getNearestEnemy(cellId = -1, filter: (value: FighterEntry, index: number, array: FighterEntry[]) => any = null): FighterEntry {
    const charMp = MapPoint.fromCellId(cellId === -1 ? this.playedFighter.cellId : cellId);
    let distance = -1;
    let enemy: FighterEntry = null;

    for (const enemyEntry of filter === null ? this.enemies : this.enemies.filter(filter)) {
      if (!enemyEntry.alive) {
        continue;
      }

      const enemyMp = MapPoint.fromCellId(enemyEntry.cellId);
      const tempDistance = charMp.distanceToCell(enemyMp);

      if (distance === -1 || tempDistance < distance) {
        distance = tempDistance;
        enemy = enemyEntry;
      }
    }

    return enemy;
  }

  public getNearestAlly(filter: (value: FighterEntry, index: number, array: FighterEntry[]) => any = null): FighterEntry {
    const charMp = MapPoint.fromCellId(this.playedFighter.cellId);
    let distance = -1;
    let ally: FighterEntry = null;

    for (const allyEntry of filter === null ? this.allies : this.allies.filter(filter)) {
      if (!allyEntry.alive) {
        continue;
      }

      const allyMp = MapPoint.fromCellId(allyEntry.cellId);
      const tempDistance = charMp.distanceToCell(allyMp);

      if (distance === -1 || tempDistance < distance) {
        distance = tempDistance;
        ally = allyEntry;
      }
    }

    return ally;
  }

  public getHandToHandEnemies(cellId = -1): FighterEntry[] {
    const charMp = MapPoint.fromCellId(cellId === -1 ? this.playedFighter.cellId : cellId);
    return this.enemies.filter((e) => e.alive && charMp.distanceToCell(MapPoint.fromCellId(e.cellId)) === 1);
  }

  public getHandToHandAllies(cellId = -1): FighterEntry[] {
    const charMp = MapPoint.fromCellId(cellId === -1 ? this.playedFighter.cellId : cellId);
    return this.allies.filter((a) => a.alive && charMp.distanceToCell(MapPoint.fromCellId(a.cellId)) === 1);
  }

  public isHandToHandWithAnEnemy(cellId = -1) {
    return this.getHandToHandEnemies(cellId).length > 0;
  }

  public isHandToHandWithAnAlly(cellId = -1) {
    return this.getHandToHandAllies(cellId).length > 0;
  }

  public getSpellZone(spellId: number, fromCellId: number, targetCellId: number, spellLevel: SpellLevels = null) {
    if (spellLevel === null) {
      const spellEntry = this.account.game.character.getSpell(spellId);
      if (spellEntry === null) {
        return null;
      }

      DataManager.get(Spells, spellId).then((response) => {
        const spell = response[0].object;

        if (spell === null) {
          return null;
        }

        DataManager.get(SpellLevels, spell.spellLevels[spellEntry.level - 1]).then((response2) => {
          spellLevel = response2[0].object;
        });
      });
    }
    return SpellShapes.getSpellEffectZone(this.account.game.map.data, spellLevel, fromCellId, targetCellId);
  }

  public canLaunchSpell(spellId: number): SpellInabilityReasons {
    const spellEntry = this.account.game.character.getSpell(spellId);

    if (spellEntry === null) {
      return SpellInabilityReasons.UNKNOWN;
    }

    DataManager.get(Spells, spellId).then((response) => {
      const spell = response[0].object;
      DataManager.get(SpellLevels, spell.spellLevels[spellEntry.level - 1]).then((response2) => {
        const spellLevel = response2[0].object;

        if (this.playedFighter.actionPoints < spellLevel.apCost) {
          return SpellInabilityReasons.ACTION_POINTS;
        }

        if (spellLevel.maxCastPerTurn > 0 && this._totalSpellLaunches.containsKey(spellId)
          && this._totalSpellLaunches.getValue(spellId) >= spellLevel.maxCastPerTurn) {
          return SpellInabilityReasons.TOO_MANY_LAUNCHES;
        }

        if (this._spellsIntervals.containsKey(spellId)) {
          return SpellInabilityReasons.COOLDOWN;
        }

        if (spellLevel.initialCooldown > 0 && this.roundNumber <= spellLevel.initialCooldown) {
          return SpellInabilityReasons.COOLDOWN;
        }

        if (spellLevel.effects.length > 0 && spellLevel.effects[0].effectId === 181
          && this.invocationsCount >= this.account.game.character.stats.summonableCreaturesBoost.total) {
          return SpellInabilityReasons.TOO_MANY_INVOCATIONS;
        }

        const tmp = spellLevel.statesRequired.filter((s) => !this._effectsDurations.containsKey(s));
        if (tmp !== undefined && tmp.length > 0) {
          return SpellInabilityReasons.REQUIRED_STATE;
        }

        const tmp2 = spellLevel.statesForbidden.filter((s) => this._effectsDurations.containsKey(s));
        if (tmp2 !== undefined && tmp2.length > 0) {
          return SpellInabilityReasons.FORBIDDEN_STATE;
        }

        return SpellInabilityReasons.NONE; // TODO: needed?
      });
    });

    return SpellInabilityReasons.NONE;
  }

  public canLaunchSpellOnTarget(spellId: number, characterCellId: number, targetCellId: number): SpellInabilityReasons {
    const spellEntry = this.account.game.character.getSpell(spellId);

    if (spellEntry === null) {
      return SpellInabilityReasons.UNKNOWN;
    }

    DataManager.get(Spells, spellId).then((response) => {
      const spell = response[0].object;

      DataManager.get(SpellLevels, spell.spellLevels[spellEntry.level - 1]).then((response2) => {
        const spellLevel = response2[0].object;

        if (spellLevel.maxCastPerTarget > 0 && this._totalSpellLaunchesInCells.containsKey(spellId)
          && this._totalSpellLaunchesInCells.getValue(spellId).containsKey(targetCellId)
          && this._totalSpellLaunchesInCells.getValue(spellId).getValue(targetCellId) >= spellLevel.maxCastPerTarget) {
          return SpellInabilityReasons.TOO_MANY_LAUNCHES_ON_CELL;
        }

        if (spellLevel.needFreeCell && !this.isCellFree(targetCellId)) {
          return SpellInabilityReasons.NEED_FREE_CELL;
        }

        if (spellLevel.needTakenCell && this.isCellFree(targetCellId) /* && characterCellId !== targetCellId */) {
          return SpellInabilityReasons.NEED_TAKEN_CELL;
        }

        // TODO: Not 100% sure this works flawlessly
        if (!this.getSpellRange(characterCellId, spellLevel).includes(targetCellId)) {
          return SpellInabilityReasons.NOT_IN_RANGE;
        }

        return SpellInabilityReasons.NONE; // TODO: needed?
      });
    });

    return SpellInabilityReasons.NONE;
  }

  public getSpellRange(characterCellId: number, spellLevel: SpellLevels): number[] {
    const range = new Array<number>();
    for (const mp of SpellShapes.getSpellRange(characterCellId, spellLevel, this.account.game.character.stats.range.total)) {
      if (mp === null || range.includes(mp.cellId)) {
        continue;
      }

      if (spellLevel.needFreeCell && this.occupiedCells.includes(mp.cellId)) {
        continue;
      }

      if ((this.account.game.map.data.cells[mp.cellId].l & 7) === 3) {
        range.push(mp.cellId);
      }
    }

    if (spellLevel.castTestLos) {
      for (let i = range.length - 1; i >= 0; i--) {
        if (Dofus1Line.isLineObstructed(this.account.game.map.data, characterCellId, range[i], this.occupiedCells, spellLevel.castInDiagonal)) {
          range.splice(i, 1);
        }
      }
    }

    return range;
  }

  public async UpdateGameFightJoinMessage(message: GameFightJoinMessage) {
    this.type = message.fightType;
    this.isFightStarted = message.isFightStarted;
    this.account.state = AccountStates.FIGHTING;
    this.onFightJoined.trigger();
  }

  public async UpdateGameFightPlacementPossiblePositionsMessage(message: GameFightPlacementPossiblePositionsMessage) {
    this.positionsForChallengers = new List(message.positionsForChallengers);
    this.positionsForDefenders = new List(message.positionsForDefenders);
    this.onPossiblePositionsReceived.trigger();
  }

  public async UpdateGameFightStartMessage(message: GameFightStartMessage) {
    this.isFightStarted = true;
    this.positionsForChallengers = new List<number>();
    this.positionsForDefenders = new List<number>();
    this.onFightStarted.trigger();
  }

  public async UpdateTextInformationMessage(message: TextInformationMessage) {
    if (message.msgId === 36) {
      this.onSpectatorJoined.trigger();
    }
  }

  public async UpdateGameFightShowFighterMessage(message: GameFightShowFighterMessage) {
    if (message.informations.contextualId === this.account.game.character.id) {
      this.playedFighter = new FightPlayerEntry(message.informations);
    } else {
      this.addFighter(message.informations);
    }
    this.sortFighters();
    this.onFightersUpdated.trigger();
  }

  public async UpdateGameFightUpdateTeamMessage(message: GameFightUpdateTeamMessage) {
    if (this.account.state === AccountStates.FIGHTING && message.team.leaderId === this.account.game.character.id && this.fightId === 0) {
      this.fightId = message.fightId;
      this.onFightIDReceived.trigger();
    }
  }

  public async UpdateGameFightOptionStateUpdateMessage(message: GameFightOptionStateUpdateMessage) {
    if (!message.state && this.options.includes(message.option)) {
      this.options = this.options.filter((o) => o !== message.option);
    } else if (message.state && !this.options.includes(message.option)) {
      this.options.push(message.option);
    }
  }

  public async UpdateGameEntitiesDispositionMessage(message: GameEntitiesDispositionMessage) {
    // TODO: Check the next line...
    message.dispositions.forEach((d) => this.getFighter(d.id) !== null ? this.getFighter(d.id).UpdateIdentifiedEntityDispositionInformations(d) : d);
    this.onFightersUpdated.trigger();
  }

  public async UpdateGameFightSynchronizeMessage(message: GameFightSynchronizeMessage) {
    message.fighters.forEach((f) => {
      const fighter = this.getFighter(f.contextualId);

      if (fighter === null) {
        this.addFighter(f);
        this.sortFighters();
      } else {
        fighter.UpdateGameFightFighterInformations(f);
      }
    });
    this.onFightersUpdated.trigger();
  }

  public async UpdateFighterStatsListMessage(message: FighterStatsListMessage) {
    this.playedFighter.UpdateCharacterCharacteristicsInformations(message.stats);
    if (this.playedFighter !== null) {
      this.account.game.character.stats.maxLifePoints = this.playedFighter.maxLifePoints;
      this.account.game.character.stats.lifePoints = this.playedFighter.lifePoints;
    }
    this.onFightersStatsUpdated.trigger();
  }

  public async UpdateGameActionFightPointsVariationMessage(message: GameActionFightPointsVariationMessage) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightPointsVariationMessage(message);
    }
  }

  public async UpdateGameActionFightDeathMessage(message: GameActionFightDeathMessage) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightDeathMessage(message);
    }
  }

  public async UpdateGameActionFightTeleportOnSameMapMessage(message: GameActionFightTeleportOnSameMapMessage) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightTeleportOnSameMapMessage(message);
    }
  }

  public async UpdateGameMapMovementMessage(message: GameMapMovementMessage) {
    const f = this.getFighter(message.actorId);
    if (f !== null) {
      f.UpdateGameMapMovementMessage(message);

      if (f.contextualId === this.playedFighter.contextualId) {
        this.onPlayerFighterMoving.trigger(message.keyMovements);
      } else {
        this.onFightersUpdated.trigger();
      }
    }
  }

  public async UpdateGameActionFightSlideMessage(message: GameActionFightSlideMessage) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightSlideMessage(message);
      this.onFightersUpdated.trigger();
    }
  }

  public async UpdateGameActionFightSummonMessage(message: GameActionFightSummonMessage) {
    this.addFighter(message.summon);
    this.sortFighters();
    this.onFightersUpdated.trigger();
  }

  public async UpdateGameActionFightLifePointsLostMessage(message: GameActionFightLifePointsLostMessage) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightLifePointsLostMessage(message);

      // Trigger update event if its our character
      if (message.targetId === this.playedFighter.contextualId) {
        this.account.game.character.stats.maxLifePoints = this.playedFighter.maxLifePoints;
        this.account.game.character.stats.lifePoints = this.playedFighter.lifePoints;
        this.onFightersStatsUpdated.trigger();
      }
    }
  }

  public async UpdateGameActionFightLifePointsGainMessage(message: GameActionFightLifePointsGainMessage) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightLifePointsGainMessage(message);

      // Trigger update event if its our character
      if (message.targetId === this.playedFighter.contextualId) {
        this.account.game.character.stats.maxLifePoints = this.playedFighter.maxLifePoints;
        this.account.game.character.stats.lifePoints = this.playedFighter.lifePoints;
        this.onFightersStatsUpdated.trigger();
      }
    }
  }

  public async UpdateGameFightLeaveMessage(message: GameFightLeaveMessage) {
    if (this.playedFighter.contextualId === message.charId) {
      this.isFightStarted = false;
    } else {
      const f = this.getFighter(message.charId);
      if (f !== null) {
        this._fighters.remove(f.contextualId);
        if (this.allies.includes(f)) {
          this._allies.remove(f.contextualId);
        } else if (this.enemies.includes(f)) {
          this._enemies.remove(f.contextualId);
        }
      }
    }
  }

  public async UpdateGameFightTurnStartMessage(message: GameFightTurnStartMessage) {
    if (this.playedFighter !== null && this.playedFighter.contextualId === message.id) {
      this.isOurTurn = true;
      this.onTurnStarted.trigger();
    }
  }

  public async UpdateGameFightTurnEndMessage(message: GameFightTurnEndMessage) {
    const fighter = this.getFighter(message.id);
    if (fighter !== null) {
      if (fighter === this.playedFighter) {
        this.isOurTurn = false;
        this._totalSpellLaunches = new Dictionary<number, number>();
        this._totalSpellLaunchesInCells = new Dictionary<number, Dictionary<number, number>>();

        // Effects
        for (let i = this._effectsDurations.count() - 1; i >= 0; i--) {
          const key = this._effectsDurations.keys()[i];
          this._effectsDurations.changeValueForKey(key, this._effectsDurations.getValue(key) - 1);
          if (this._effectsDurations.getValue(key) === 0) {
            this._effectsDurations.remove(key);
          }
        }

        // Spells
        for (let i = this._spellsIntervals.count() - 1; i >= 0; i--) {
          const key = this._spellsIntervals.keys()[i];
          this._spellsIntervals.changeValueForKey(key, this._spellsIntervals.getValue(key) - 1);
          if (this._spellsIntervals.getValue(key) === 0) {
            this._spellsIntervals.remove(key);
          }
        }

        this.onTurnEnded.trigger();
      }
      fighter.UpdateGameFightTurnEndMessage(message);
    }
  }

  public async UpdateGameActionFightDispellableEffectMessage(message: GameActionFightDispellableEffectMessage) {
    if (message.effect instanceof FightTemporaryBoostStateEffect) {
     if (this.playedFighter) {
      if (message.effect.targetId === this.playedFighter.contextualId) {
        if (this._effectsDurations.containsKey(message.effect.stateId)) {
          this._effectsDurations.remove(message.effect.stateId);
          this.account.logger.logWarning("", `Added state ${message.effect.stateId} for ${message.effect.turnDuration} turns`);
          this._effectsDurations.add(message.effect.stateId, message.effect.turnDuration);
        }
      }
     }
    } else if (message.effect instanceof FightTemporaryBoostEffect) {
      if (this.playedFighter) {
        if (message.effect.targetId === this.playedFighter.contextualId) {
          this.playedFighter.Update(message.actionId, message.effect);
        }
      }
    }
  }

  public async UpdateGameFightEndMessage(message: GameFightEndMessage) {
    this.clear();
    this.account.state = AccountStates.NONE;
    this.onFightEnded.trigger();
  }

  public async UpdateGameActionFightSpellCastMessage(message: GameActionFightSpellCastMessage) {
    // TODO: Check next line
    if (this.playedFighter !== null && this.playedFighter.contextualId === message.sourceId) {
      const spellResp = await DataManager.get(Spells, message.spellId);
      const spell = spellResp[0].object;
      const spellLevelResp = await DataManager.get(SpellLevels, spell.spellLevels[message.spellLevel - 1]);
      const spellLevel = spellLevelResp[0].object;

      if (spellLevel.minCastInterval > 0 && !this._spellsIntervals.containsKey(spell.id)) {
        this._spellsIntervals.add(spell.id, spellLevel.minCastInterval);
      }

      if (!this._totalSpellLaunches.containsKey(spell.id)) {
        this._totalSpellLaunches.add(spell.id, 0);
      }
      this._totalSpellLaunches.changeValueForKey(spell.id, this._totalSpellLaunches.getValue(spell.id) + 1);

      if (this._totalSpellLaunchesInCells.containsKey(spell.id)) {
        if (!this._totalSpellLaunchesInCells.getValue(spell.id).containsKey(message.destinationCellId)) {
          this._totalSpellLaunchesInCells.getValue(spell.id).add(message.destinationCellId, 0);
        }
        const value = this._totalSpellLaunchesInCells.getValue(spell.id);
        value.changeValueForKey(message.destinationCellId, value.getValue(message.destinationCellId) + 1);
      } else {
        this._totalSpellLaunchesInCells.add(spell.id, new Dictionary<number, number>([
          { key: message.destinationCellId, value: 1 },
        ]));
      }
    }
  }

  public async UpdateGameFightNewRoundMessage(message: GameFightNewRoundMessage) {
    this.roundNumber = message.roundNumber;
  }

  private sortFighters() {
    if (this.playedFighter === null) {
      return;
    }

    for (const fighter of this.fighters) {
      if (this._allies.containsKey(fighter.contextualId) || this._enemies.containsKey(fighter.contextualId)) {
        continue;
      }

      if (fighter.team === this.playedFighter.team) {
        this._allies.add(fighter.contextualId, fighter);
      } else {
        this._enemies.add(fighter.contextualId, fighter);
      }
    }
  }

  private addFighter(infos: GameFightFighterInformations) {
    if (infos._type === "GameFightCharacterInformations" || infos._type === "GameFightMutantInformations") {
      this._fighters.add(infos.contextualId, new FightPlayerEntry(infos));
    } else if (infos._type === "GameFightMonsterInformations") {
      this._fighters.add(infos.contextualId, new FightMonsterEntry(infos as GameFightMonsterInformations, infos));
    }
  }
}
