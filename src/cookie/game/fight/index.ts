import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import Dofus1Line from "@/core/pathfinder/Dofus1Line";
import MapPoint from "@/core/pathfinder/MapPoint";
import SpellShapes from "@/core/pathfinder/shapes";
import FighterEntry from "@/game/fight/fighters/FighterEntry";
import FightMonsterEntry from "@/game/fight/fighters/FightMonsterEntry";
import FightPlayerEntry from "@/game/fight/fighters/FightPlayerEntry";
import { SpellInabilityReasons } from "@/game/fight/SpellInabilityReasons";
import DataManager from "@/protocol/data";
import SpellLevels from "@/protocol/data/classes/SpellLevels";
import Spells from "@/protocol/data/classes/Spells";
import { DataTypes } from "@/protocol/data/DataTypes";
import { FightOptionsEnum } from "@/protocol/enums/FightOptionsEnum";
import { FightTypeEnum } from "@/protocol/enums/FightTypeEnum";
import { GameActionFightInvisibilityStateEnum } from "@/protocol/enums/GameActionFightInvisibilityStateEnum";
import FighterStatsListMessage from "@/protocol/network/messages/FighterStatsListMessage";
import GameActionFightDeathMessage from "@/protocol/network/messages/GameActionFightDeathMessage";
import GameActionFightDispellableEffectMessage from "@/protocol/network/messages/GameActionFightDispellableEffectMessage";
import GameActionFightLifePointsGainMessage from "@/protocol/network/messages/GameActionFightLifePointsGainMessage";
import GameActionFightLifePointsLostMessage from "@/protocol/network/messages/GameActionFightLifePointsLostMessage";
import GameActionFightPointsVariationMessage from "@/protocol/network/messages/GameActionFightPointsVariationMessage";
import GameActionFightSlideMessage from "@/protocol/network/messages/GameActionFightSlideMessage";
import GameActionFightSpellCastMessage from "@/protocol/network/messages/GameActionFightSpellCastMessage";
import GameActionFightSummonMessage from "@/protocol/network/messages/GameActionFightSummonMessage";
import GameActionFightTeleportOnSameMapMessage from "@/protocol/network/messages/GameActionFightTeleportOnSameMapMessage";
import GameEntitiesDispositionMessage from "@/protocol/network/messages/GameEntitiesDispositionMessage";
import GameFightEndMessage from "@/protocol/network/messages/GameFightEndMessage";
import GameFightJoinMessage from "@/protocol/network/messages/GameFightJoinMessage";
import GameFightLeaveMessage from "@/protocol/network/messages/GameFightLeaveMessage";
import GameFightNewRoundMessage from "@/protocol/network/messages/GameFightNewRoundMessage";
import GameFightOptionStateUpdateMessage from "@/protocol/network/messages/GameFightOptionStateUpdateMessage";
import GameFightPlacementPossiblePositionsMessage from "@/protocol/network/messages/GameFightPlacementPossiblePositionsMessage";
import GameFightShowFighterMessage from "@/protocol/network/messages/GameFightShowFighterMessage";
import GameFightStartMessage from "@/protocol/network/messages/GameFightStartMessage";
import GameFightSynchronizeMessage from "@/protocol/network/messages/GameFightSynchronizeMessage";
import GameFightTurnEndMessage from "@/protocol/network/messages/GameFightTurnEndMessage";
import GameFightTurnStartMessage from "@/protocol/network/messages/GameFightTurnStartMessage";
import GameFightUpdateTeamMessage from "@/protocol/network/messages/GameFightUpdateTeamMessage";
import GameMapMovementMessage from "@/protocol/network/messages/GameMapMovementMessage";
import TextInformationMessage from "@/protocol/network/messages/TextInformationMessage";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import FightTemporaryBoostEffect from "@/protocol/network/types/FightTemporaryBoostEffect";
import FightTemporaryBoostStateEffect from "@/protocol/network/types/FightTemporaryBoostStateEffect";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMonsterInformations from "@/protocol/network/types/GameFightMonsterInformations";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";
import { List } from "linqts";

export default class Fight implements IClearable {
  public type: FightTypeEnum = FightTypeEnum.FIGHT_TYPE_CHALLENGE;
  public options: FightOptionsEnum[];
  public isFightStarted: boolean = false;
  public playedFighter: FightPlayerEntry | null = null;
  public isOurTurn: boolean = false;
  public roundNumber: number = 0;
  public positionsForChallengers = new List<number>();
  public positionsForDefenders = new List<number>();
  public fightId: number = 0;
  private account: Account;
  private _allies: Map<number, FighterEntry>;
  private _enemies: Map<number, FighterEntry>;
  private _fighters: Map<number, FighterEntry>;
  private _effectsDurations: Map<number, number>;
  private _spellsIntervals: Map<number, number>;
  private _totalSpellLaunches: Map<number, number>;
  private _totalSpellLaunchesInCells: Map<number, Map<number, number>>;
  private readonly onFightJoined = new LiteEvent<void>();
  private readonly onFightIDReceived = new LiteEvent<void>();
  private readonly onFightStarted = new LiteEvent<void>();
  private readonly onFightEnded = new LiteEvent<void>();
  private readonly onSpectatorJoined = new LiteEvent<void>();
  private readonly onTurnStarted = new LiteEvent<void>();
  private readonly onTurnEnded = new LiteEvent<void>();
  private readonly onFightersUpdated = new LiteEvent<void>();
  private readonly onFighterStatsUpdated = new LiteEvent<void>();
  private readonly onPossiblePositionsReceived = new LiteEvent<void>();
  private readonly onPlayedFighterMoving = new LiteEvent<number[]>();

  constructor(account: Account) {
    this.account = account;

    this._allies = new Map<number, FighterEntry>();
    this._effectsDurations = new Map<number, number>();
    this._enemies = new Map<number, FighterEntry>();
    this._fighters = new Map<number, FighterEntry>();
    this._spellsIntervals = new Map<number, number>();
    this._totalSpellLaunches = new Map<number, number>();
    this._totalSpellLaunchesInCells = new Map<number, Map<number, number>>();
    this.options = [];
  }

  get monsters() {
    return Array.from(this._enemies.values()).map(a => a as FightMonsterEntry);
  }

  get invocationsCount() {
    if (!this.playedFighter) {
      return 0;
    }
    return this.fighters.filter(
      f => f.stats.summoner === this.playedFighter!.contextualId
    ).length;
  }

  get aliveEnemiesCount() {
    return this.enemies.filter(e => e.alive).length;
  }

  get occupiedCells() {
    return this.fighters.map(f => f.cellId);
  }

  get weakestEnemy(): FighterEntry | null {
    let lp = -1;
    let enemy: FighterEntry | null = null;

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

  get weakestAlly(): FighterEntry | null {
    let lp = -1;
    let ally: FighterEntry | null = null;

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

  get allies() {
    return Array.from(this._allies.values()).filter(a => a.alive);
  }

  get enemies() {
    return Array.from(this._enemies.values()).filter(
      e =>
        e.alive &&
        e.stats.invisibilityState !==
          GameActionFightInvisibilityStateEnum.INVISIBLE
    );
  }

  get fighters() {
    return Array.from(this._fighters.values()).filter(a => a.alive);
  }

  public get FightJoined() {
    return this.onFightJoined.expose();
  }

  public get FightIDReceived() {
    return this.onFightIDReceived.expose();
  }

  public get FightStarted() {
    return this.onFightStarted.expose();
  }

  public get FightEnded() {
    return this.onFightEnded.expose();
  }

  public get SpectatorJoined() {
    return this.onSpectatorJoined.expose();
  }

  public get TurnStarted() {
    return this.onTurnStarted.expose();
  }

  public get TurnEnded() {
    return this.onTurnEnded.expose();
  }

  public get FightersUpdated() {
    return this.onFightersUpdated.expose();
  }

  public get FighterStatsUpdated() {
    return this.onFighterStatsUpdated.expose();
  }

  public get PossiblePositionsReceived() {
    return this.onPossiblePositionsReceived.expose();
  }

  public get PlayedFighterMoving() {
    return this.onPlayedFighterMoving.expose();
  }

  public clear() {
    this._allies = new Map<number, FighterEntry>();
    this._effectsDurations = new Map<number, number>();
    this._enemies = new Map<number, FighterEntry>();
    this._fighters = new Map<number, FighterEntry>();
    this._spellsIntervals = new Map<number, number>();
    this._totalSpellLaunches = new Map<number, number>();
    this._totalSpellLaunchesInCells = new Map<number, Map<number, number>>();

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
      await this.account.network.sendMessageFree(
        "GameFightOptionToggleMessage",
        { option }
      );
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
    await this.account.network.sendMessageFree(
      "GameActionFightCastRequestMessage",
      { spellId, cellId }
    );
    // await this.account.network.sendMessage(new GameActionFightCastRequestMessage(spellId, cellId));
    // }
  }

  public hasState(stateId: number): boolean {
    return this._effectsDurations.has(stateId);
  }

  public getFighter(id: number): FighterEntry | null {
    if (this.playedFighter !== null && this.playedFighter.contextualId === id) {
      return this.playedFighter;
    }

    return this._fighters.get(id) || null;
  }

  public getFighterInCell(cellId: number): FighterEntry | null {
    if (this.playedFighter !== null && this.playedFighter.cellId === cellId) {
      return this.playedFighter;
    }
    const tmp = this.fighters.find(f => f.alive && f.cellId === cellId);
    return tmp || null;
  }

  public isCellFree(cellId: number): boolean {
    return this.getFighterInCell(cellId) === null;
  }

  public getNearestEnemy(
    cellId = -1,
    filter?: (value: FighterEntry | null) => boolean
  ): FighterEntry | null {
    if (!this.playedFighter) {
      return null;
    }
    const charMp = MapPoint.fromCellId(
      cellId === -1 ? this.playedFighter.cellId : cellId
    );
    if (!charMp) {
      return null;
    }
    let distance = -1;
    let enemy: FighterEntry | null = null;

    for (const enemyEntry of !filter
      ? this.enemies
      : this.enemies.filter(filter)) {
      if (!enemyEntry.alive) {
        continue;
      }

      const enemyMp = MapPoint.fromCellId(enemyEntry.cellId);
      if (!enemyMp) {
        continue;
      }
      const tempDistance = charMp.distanceToCell(enemyMp);

      if (distance === -1 || tempDistance < distance) {
        distance = tempDistance;
        enemy = enemyEntry;
      }
    }

    return enemy;
  }

  public getNearestAlly(
    filter: (value: FighterEntry | null) => boolean
  ): FighterEntry | null {
    if (!this.playedFighter) {
      return null;
    }
    const charMp = MapPoint.fromCellId(this.playedFighter.cellId);
    if (!charMp) {
      return null;
    }
    let distance = -1;
    let ally: FighterEntry | null = null;

    for (const allyEntry of filter === null
      ? this.allies
      : this.allies.filter(filter)) {
      if (!allyEntry.alive) {
        continue;
      }

      const allyMp = MapPoint.fromCellId(allyEntry.cellId);
      if (!allyMp) {
        return null;
      }
      const tempDistance = charMp.distanceToCell(allyMp);

      if (distance === -1 || tempDistance < distance) {
        distance = tempDistance;
        ally = allyEntry;
      }
    }

    return ally;
  }

  public getHandToHandEnemies(cellId = -1): FighterEntry[] {
    if (!this.playedFighter) {
      return [];
    }
    const charMp = MapPoint.fromCellId(
      cellId === -1 ? this.playedFighter.cellId : cellId
    );
    if (!charMp) {
      return [];
    }
    return this.enemies.filter(e => {
      const eMp = MapPoint.fromCellId(e.cellId);
      if (!eMp) {
        return false;
      }
      return e.alive && charMp.distanceToCell(eMp) === 1;
    });
  }

  public getHandToHandAllies(cellId = -1): FighterEntry[] {
    if (!this.playedFighter) {
      return [];
    }
    const charMp = MapPoint.fromCellId(
      cellId === -1 ? this.playedFighter.cellId : cellId
    );
    if (!charMp) {
      return [];
    }
    return this.allies.filter(a => {
      const mp = MapPoint.fromCellId(a.cellId);
      if (!mp) {
        return false;
      }
      return a.alive && charMp.distanceToCell(mp) === 1;
    });
  }

  public isHandToHandWithAnEnemy(cellId = -1) {
    return this.getHandToHandEnemies(cellId).length > 0;
  }

  public isHandToHandWithAnAlly(cellId = -1) {
    return this.getHandToHandAllies(cellId).length > 0;
  }

  public async getSpellZone(
    spellId: number,
    fromCellId: number,
    targetCellId: number,
    spellLevel?: SpellLevels
  ) {
    if (!spellLevel) {
      const spellEntry = this.account.game.character.getSpell(spellId);
      if (spellEntry === null) {
        return null;
      }

      const response = await DataManager.get<Spells>(DataTypes.Spells, spellId);
      const spell = response[0].object;

      if (spell === null) {
        return null;
      }

      const response2 = await DataManager.get<SpellLevels>(
        DataTypes.SpellLevels,
        spell.spellLevels[spellEntry.level - 1]
      );
      spellLevel = response2[0].object;
    }
    return SpellShapes.getSpellEffectZone(
      this.account.game.map.data!,
      spellLevel,
      fromCellId,
      targetCellId
    );
  }

  public async canLaunchSpell(spellId: number): Promise<SpellInabilityReasons> {
    const spellEntry = this.account.game.character.getSpell(spellId);

    if (!spellEntry || !this.playedFighter) {
      return SpellInabilityReasons.UNKNOWN;
    }

    const spellResp = await DataManager.get<Spells>(DataTypes.Spells, spellId);
    const spell = spellResp[0].object;
    const spellLevelResp = await DataManager.get<SpellLevels>(
      DataTypes.SpellLevels,
      spell.spellLevels[spellEntry.level - 1]
    );
    const spellLevel = spellLevelResp[0].object;

    if (this.playedFighter.actionPoints < spellLevel.apCost) {
      return SpellInabilityReasons.ACTION_POINTS;
    }

    if (
      spellLevel.maxCastPerTurn > 0 &&
      this._totalSpellLaunches.has(spellId) &&
      this._totalSpellLaunches.get(spellId)! >= spellLevel.maxCastPerTurn
    ) {
      return SpellInabilityReasons.TOO_MANY_LAUNCHES;
    }

    if (this._spellsIntervals.has(spellId)) {
      return SpellInabilityReasons.COOLDOWN;
    }

    if (
      spellLevel.initialCooldown > 0 &&
      this.roundNumber <= spellLevel.initialCooldown
    ) {
      return SpellInabilityReasons.COOLDOWN;
    }

    if (
      spellLevel.effects.length > 0 &&
      spellLevel.effects[0].effectId === 181 &&
      this.invocationsCount >=
        this.totalStat(
          this.account.game.character.stats.summonableCreaturesBoost
        )
    ) {
      return SpellInabilityReasons.TOO_MANY_INVOCATIONS;
    }

    const tmp = spellLevel.statesRequired.filter(
      s => !this._effectsDurations.has(s)
    );
    if (tmp !== undefined && tmp.length > 0) {
      return SpellInabilityReasons.REQUIRED_STATE;
    }

    const tmp2 = spellLevel.statesForbidden.filter(s =>
      this._effectsDurations.has(s)
    );
    if (tmp2 !== undefined && tmp2.length > 0) {
      return SpellInabilityReasons.FORBIDDEN_STATE;
    }

    return SpellInabilityReasons.NONE;
  }

  public async canLaunchSpellOnTarget(
    spellId: number,
    characterCellId: number,
    targetCellId: number
  ): Promise<SpellInabilityReasons> {
    const spellEntry = this.account.game.character.getSpell(spellId);

    if (spellEntry === null) {
      return SpellInabilityReasons.UNKNOWN;
    }

    const response = await DataManager.get<Spells>(DataTypes.Spells, spellId);
    const spell = response[0].object;

    const response2 = await DataManager.get<SpellLevels>(
      DataTypes.SpellLevels,
      spell.spellLevels[spellEntry.level - 1]
    );

    const spellLevel = response2[0].object;

    if (
      spellLevel.maxCastPerTarget > 0 &&
      this._totalSpellLaunchesInCells.has(spellId) &&
      this._totalSpellLaunchesInCells.get(spellId)!.has(targetCellId) &&
      this._totalSpellLaunchesInCells.get(spellId)!.get(targetCellId)! >=
        spellLevel.maxCastPerTarget
    ) {
      return SpellInabilityReasons.TOO_MANY_LAUNCHES_ON_CELL;
    }

    if (spellLevel.needFreeCell && !this.isCellFree(targetCellId)) {
      return SpellInabilityReasons.NEED_FREE_CELL;
    }

    if (
      spellLevel.needTakenCell &&
      this.isCellFree(targetCellId) /* && characterCellId !== targetCellId */
    ) {
      return SpellInabilityReasons.NEED_TAKEN_CELL;
    }

    // TODO: Not 100% sure this works flawlessly
    if (
      !this.getSpellRange(characterCellId, spellLevel).includes(targetCellId)
    ) {
      return SpellInabilityReasons.NOT_IN_RANGE;
    }

    return SpellInabilityReasons.NONE;
  }

  public getSpellRange(
    characterCellId: number,
    spellLevel: SpellLevels
  ): number[] {
    const range: number[] = [];
    for (const mp of SpellShapes.getSpellRange(
      characterCellId,
      spellLevel,
      this.totalStat(this.account.game.character.stats.range)
    )) {
      if (mp === null || range.includes(mp.cellId)) {
        continue;
      }

      if (spellLevel.needFreeCell && this.occupiedCells.includes(mp.cellId)) {
        continue;
      }

      if ((this.account.game.map.data!.cells[mp.cellId].l! & 7) === 3) {
        range.push(mp.cellId);
      }
    }

    if (spellLevel.castTestLos) {
      for (let i = range.length - 1; i >= 0; i--) {
        if (
          Dofus1Line.isLineObstructed(
            this.account.game.map.data!,
            characterCellId,
            range[i],
            this.occupiedCells,
            spellLevel.castInDiagonal
          )
        ) {
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

  public async UpdateGameFightPlacementPossiblePositionsMessage(
    message: GameFightPlacementPossiblePositionsMessage
  ) {
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

  public async UpdateGameFightShowFighterMessage(
    message: GameFightShowFighterMessage
  ) {
    if (message.informations.contextualId === this.account.game.character.id) {
      this.playedFighter = new FightPlayerEntry(message.informations);
    } else {
      await this.addFighter(message.informations);
    }
    this.sortFighters();
    this.onFightersUpdated.trigger();
  }

  public async UpdateGameFightUpdateTeamMessage(
    message: GameFightUpdateTeamMessage
  ) {
    if (
      this.account.state === AccountStates.FIGHTING &&
      message.team.leaderId === this.account.game.character.id &&
      this.fightId === 0
    ) {
      this.fightId = message.fightId;
      this.onFightIDReceived.trigger();
    }
  }

  public async UpdateGameFightOptionStateUpdateMessage(
    message: GameFightOptionStateUpdateMessage
  ) {
    if (!message.state && this.options.includes(message.option)) {
      this.options = this.options.filter(o => o !== message.option);
    } else if (message.state && !this.options.includes(message.option)) {
      this.options.push(message.option);
    }
  }

  public async UpdateGameEntitiesDispositionMessage(
    message: GameEntitiesDispositionMessage
  ) {
    // TODO: Check the next line...
    message.dispositions.forEach(
      d =>
        this.getFighter(d.id) !== null
          ? this.getFighter(
              d.id
            )!.UpdateIdentifiedEntityDispositionInformations(d)
          : d
    );
    this.onFightersUpdated.trigger();
  }

  public async UpdateGameFightSynchronizeMessage(
    message: GameFightSynchronizeMessage
  ) {
    for (const f of message.fighters) {
      const fighter = this.getFighter(f.contextualId);

      if (fighter === null) {
        await this.addFighter(f);
        this.sortFighters();
      } else {
        fighter.UpdateGameFightFighterInformations(f);
      }
    }

    this.onFightersUpdated.trigger();
  }

  public async UpdateFighterStatsListMessage(message: FighterStatsListMessage) {
    if (this.playedFighter !== null) {
      this.playedFighter.UpdateCharacterCharacteristicsInformations(
        message.stats
      );
      this.account.game.character.stats.maxLifePoints = this.playedFighter.maxLifePoints;
      this.account.game.character.stats.lifePoints = this.playedFighter.lifePoints;
      this.onFighterStatsUpdated.trigger();
    }
  }

  public async UpdateGameActionFightPointsVariationMessage(
    message: GameActionFightPointsVariationMessage
  ) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightPointsVariationMessage(message);
    }
  }

  public async UpdateGameActionFightDeathMessage(
    message: GameActionFightDeathMessage
  ) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightDeathMessage(message);
    }
  }

  public async UpdateGameActionFightTeleportOnSameMapMessage(
    message: GameActionFightTeleportOnSameMapMessage
  ) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightTeleportOnSameMapMessage(message);
    }
  }

  public async UpdateGameMapMovementMessage(message: GameMapMovementMessage) {
    const f = this.getFighter(message.actorId);
    if (f !== null) {
      f.UpdateGameMapMovementMessage(message);

      if (
        this.playedFighter &&
        f.contextualId === this.playedFighter.contextualId
      ) {
        this.onPlayedFighterMoving.trigger(message.keyMovements);
      } else {
        this.onFightersUpdated.trigger();
      }
    }
  }

  public async UpdateGameActionFightSlideMessage(
    message: GameActionFightSlideMessage
  ) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightSlideMessage(message);
      this.onFightersUpdated.trigger();
    }
  }

  public async UpdateGameActionFightSummonMessage(
    message: GameActionFightSummonMessage
  ) {
    await this.addFighter(message.summon);
    this.sortFighters();
    this.onFightersUpdated.trigger();
  }

  public async UpdateGameActionFightLifePointsLostMessage(
    message: GameActionFightLifePointsLostMessage
  ) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightLifePointsLostMessage(message);

      // Trigger update event if its our character
      if (
        this.playedFighter &&
        message.targetId === this.playedFighter.contextualId
      ) {
        this.account.game.character.stats.maxLifePoints = this.playedFighter.maxLifePoints;
        this.account.game.character.stats.lifePoints = this.playedFighter.lifePoints;
        this.onFighterStatsUpdated.trigger();
      }
    }
  }

  public async UpdateGameActionFightLifePointsGainMessage(
    message: GameActionFightLifePointsGainMessage
  ) {
    const f = this.getFighter(message.targetId);
    if (f !== null) {
      f.UpdateGameActionFightLifePointsGainMessage(message);

      // Trigger update event if its our character
      if (
        this.playedFighter &&
        message.targetId === this.playedFighter.contextualId
      ) {
        this.account.game.character.stats.maxLifePoints = this.playedFighter.maxLifePoints;
        this.account.game.character.stats.lifePoints = this.playedFighter.lifePoints;
        this.onFighterStatsUpdated.trigger();
      }
    }
  }

  public async UpdateGameFightLeaveMessage(message: GameFightLeaveMessage) {
    if (
      this.playedFighter &&
      this.playedFighter.contextualId === message.charId
    ) {
      this.isFightStarted = false;
    } else {
      const f = this.getFighter(message.charId);
      if (f !== null) {
        this._fighters.delete(f.contextualId);
        if (this.allies.includes(f)) {
          this._allies.delete(f.contextualId);
        } else if (this.enemies.includes(f)) {
          this._enemies.delete(f.contextualId);
        }
      }
    }
  }

  public async UpdateGameFightTurnStartMessage(
    message: GameFightTurnStartMessage
  ) {
    if (
      this.playedFighter !== null &&
      this.playedFighter.contextualId === message.id
    ) {
      this.isOurTurn = true;
      this.onTurnStarted.trigger();
    }
  }

  public async UpdateGameFightTurnEndMessage(message: GameFightTurnEndMessage) {
    const fighter = this.getFighter(message.id);
    if (fighter === null) {
      return;
    }
    if (fighter === this.playedFighter) {
      this.isOurTurn = false;
      this._totalSpellLaunches = new Map<number, number>();
      this._totalSpellLaunchesInCells = new Map<number, Map<number, number>>();

      // Effects
      const effectsKeys = Array.from(this._effectsDurations.keys()).reverse();
      for (const key of effectsKeys) {
        const actualValue = this._effectsDurations.get(key)!;
        this._effectsDurations.set(key, actualValue - 1);
        if (actualValue - 1 === 0) {
          this._effectsDurations.delete(key);
        }
      }

      // Spells
      const spellsIntervalsKeys = Array.from(
        this._spellsIntervals.keys()
      ).reverse();
      for (const key of spellsIntervalsKeys) {
        const actualValue = this._spellsIntervals.get(key)!;
        this._spellsIntervals.set(key, actualValue - 1);
        if (actualValue - 1 === 0) {
          this._spellsIntervals.delete(key);
        }
      }

      this.onTurnEnded.trigger();
    }
    fighter.UpdateGameFightTurnEndMessage(message);
  }

  public async UpdateGameActionFightDispellableEffectMessage(
    message: GameActionFightDispellableEffectMessage
  ) {
    if (message.effect._type === "FightTemporaryBoostStateEffect") {
      const effect = message.effect as FightTemporaryBoostStateEffect;
      if (this.playedFighter) {
        if (effect.targetId === this.playedFighter.contextualId) {
          if (this._effectsDurations.has(effect.stateId)) {
            this._effectsDurations.delete(effect.stateId);
            this.account.logger.logWarning(
              LanguageManager.trans("fight"),
              LanguageManager.trans(
                "fightAddedState",
                effect.stateId,
                effect.turnDuration
              )
            );
            this._effectsDurations.set(effect.stateId, effect.turnDuration);
          }
        }
      }
    } else if (message.effect._type === "FightTemporaryBoostEffect") {
      const effect = message.effect as FightTemporaryBoostEffect;
      if (this.playedFighter) {
        if (effect.targetId === this.playedFighter.contextualId) {
          this.playedFighter.Update(message.actionId, effect);
        }
      }
    }
  }

  public async UpdateGameFightEndMessage(message: GameFightEndMessage) {
    this.clear();
    this.account.state = AccountStates.NONE;
    this.onFightEnded.trigger();
  }

  public async UpdateGameActionFightSpellCastMessage(
    message: GameActionFightSpellCastMessage
  ) {
    // TODO: Check next line
    if (
      this.playedFighter !== null &&
      this.playedFighter.contextualId === message.sourceId
    ) {
      const spellResp = await DataManager.get<Spells>(
        DataTypes.Spells,
        message.spellId
      );
      const spell = spellResp[0].object;
      const spellLevelResp = await DataManager.get<SpellLevels>(
        DataTypes.SpellLevels,
        spell.spellLevels[message.spellLevel - 1]
      );
      const spellLevel = spellLevelResp[0].object;

      if (
        spellLevel.minCastInterval > 0 &&
        !this._spellsIntervals.has(spell.id)
      ) {
        this._spellsIntervals.set(spell.id, spellLevel.minCastInterval);
      }

      if (!this._totalSpellLaunches.has(spell.id)) {
        this._totalSpellLaunches.set(spell.id, 0);
      }
      this._totalSpellLaunches.set(
        spell.id,
        this._totalSpellLaunches.get(spell.id)! + 1
      );

      if (this._totalSpellLaunchesInCells.has(spell.id)) {
        if (
          !this._totalSpellLaunchesInCells
            .get(spell.id)!
            .has(message.destinationCellId)
        ) {
          this._totalSpellLaunchesInCells
            .get(spell.id)!
            .set(message.destinationCellId, 0);
        }
        const value = this._totalSpellLaunchesInCells.get(spell.id)!;
        value.set(
          message.destinationCellId,
          value.get(message.destinationCellId)! + 1
        );
      } else {
        this._totalSpellLaunchesInCells.set(
          spell.id,
          new Map<number, number>([[message.destinationCellId, 1]])
        );
      }
    }
  }

  public async UpdateGameFightNewRoundMessage(
    message: GameFightNewRoundMessage
  ) {
    this.roundNumber = message.roundNumber;
  }

  private sortFighters() {
    if (this.playedFighter === null) {
      return;
    }

    for (const fighter of this.fighters) {
      if (
        this._allies.has(fighter.contextualId) ||
        this._enemies.has(fighter.contextualId)
      ) {
        continue;
      }

      if (fighter.team === this.playedFighter.team) {
        this._allies.set(fighter.contextualId, fighter);
      } else {
        this._enemies.set(fighter.contextualId, fighter);
      }
    }
  }

  private async addFighter(infos: GameFightFighterInformations) {
    if (
      infos._type === "GameFightCharacterInformations" ||
      infos._type === "GameFightMutantInformations"
    ) {
      this._fighters.set(infos.contextualId, new FightPlayerEntry(infos));
    } else if (infos._type === "GameFightMonsterInformations") {
      this._fighters.set(
        infos.contextualId,
        await FightMonsterEntry.setup(
          infos as GameFightMonsterInformations,
          infos
        )
      );
    }
  }

  private totalStat(stat: CharacterBaseCharacteristic): number {
    return (
      stat.base +
      stat.objectsAndMountBonus +
      stat.alignGiftBonus +
      stat.contextModif
    );
  }
}
