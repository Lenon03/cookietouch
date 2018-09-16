import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import LanguageManager from "@/configurations/language/LanguageManager";
import MonstersGroupEntry from "@/game/map/entities/MonstersGroupEntry";
import NpcEntry from "@/game/map/entities/NpcEntry";
import PlayerEntry from "@/game/map/entities/PlayerEntry";
import ElementInCellEntry from "@/game/map/interactives/ElementInCellEntry";
import InteractiveElementEntry from "@/game/map/interactives/InteractiveElementEntry";
import StatedElementEntry from "@/game/map/interactives/StatedElementEntry";
import DataManager from "@/protocol/data";
import Areas from "@/protocol/data/classes/Areas";
import MapPositions from "@/protocol/data/classes/MapPositions";
import SubAreas from "@/protocol/data/classes/SubAreas";
import { DataTypes } from "@/protocol/data/DataTypes";
import MapData from "@/protocol/data/map";
import MapsManager from "@/protocol/data/map/MapsManager";
import GameContextRemoveElementMessage from "@/protocol/network/messages/GameContextRemoveElementMessage";
import GameContextRemoveMultipleElementsMessage from "@/protocol/network/messages/GameContextRemoveMultipleElementsMessage";
import GameRolePlayShowChallengeMessage from "@/protocol/network/messages/GameRolePlayShowChallengeMessage";
import MapComplementaryInformationsDataMessage from "@/protocol/network/messages/MapComplementaryInformationsDataMessage";
import GameRolePlayCharacterInformations from "@/protocol/network/types/GameRolePlayCharacterInformations";
import GameRolePlayGroupMonsterInformations from "@/protocol/network/types/GameRolePlayGroupMonsterInformations";
import GameRolePlayMutantInformations from "@/protocol/network/types/GameRolePlayMutantInformations";
import GameRolePlayNpcInformations from "@/protocol/network/types/GameRolePlayNpcInformations";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";
import Pushbullet from "@/utils/Pushbullet";
import { NotificationType } from "@/utils/Pushbullet/types";
import { sleep } from "@/utils/Time";

export default class MapGame implements IClearable {
  get id() {
    return this.data.id;
  }

  get currentPosition() {
    return `${this.posX},${this.posY}`;
  }

  get labelPosition() {
    return `${this.area} - ${this.subArea} [${this.posX},${this.posY}]`;
  }

  get occupiedCells(): number[] {
    const pCells = this.players.map(p => p.cellId);
    const mCells = this.monstersGroups.map(m => m.cellId);
    const nCells = this.npcs.map(n => n.cellId);
    return pCells.concat(mCells, nCells);
  }

  // Events
  public get MapChanged() {
    return this.onMapChanged.expose();
  }

  public get MapLoaded() {
    return this.onMapLoaded.expose();
  }

  public get PlayerJoined() {
    return this.onPlayerJoined.expose();
  }

  public get PlayerLeft() {
    return this.onPlayerLeft.expose();
  }

  public get EntitiesUpdated() {
    return this.onEntitiesUpdated.expose();
  }

  public get InteractivesUpdated() {
    return this.onInteractivesUpdated.expose();
  }

  public get PlayedCharacterMoving() {
    return this.onPlayedCharacterMoving.expose();
  }

  get players() {
    return Array.from(this._players.values());
  }

  get npcs() {
    return Array.from(this._npcs.values());
  }

  get monstersGroups() {
    return Array.from(this._monstersGroups.values());
  }

  get interactives() {
    return Array.from(this._interactives.values());
  }

  get doors() {
    return Array.from(this._doors.values());
  }

  get statedElements() {
    return Array.from(this._statedElements.values());
  }

  get phenixs() {
    return Array.from(this._phenixs.values());
  }

  get lockedStorages() {
    return Array.from(this._lockedStorages.values());
  }
  private static readonly doorSkillIds = [184, 183, 187, 198, 114, 84];
  private static readonly doorTypeIds = [-1, 128, 168, 16];

  public data: MapData;
  public area: string;
  public subArea: string;
  public posX: number;
  public posY: number;
  public playedCharacter: PlayerEntry = null;
  public teleportableCells: number[] = [];
  public blacklistedMonsters: number[] = [];
  public zaap: ElementInCellEntry = null;
  public zaapi: ElementInCellEntry = null;
  private _players = new Map<number, PlayerEntry>();
  private _npcs = new Map<number, NpcEntry>();
  private _monstersGroups = new Map<number, MonstersGroupEntry>();
  private _interactives = new Map<number, InteractiveElementEntry>();
  private _doors = new Map<number, ElementInCellEntry>();
  private _statedElements = new Map<number, StatedElementEntry>();
  private _phenixs = new Map<number, ElementInCellEntry>();
  private _lockedStorages = new Map<number, ElementInCellEntry>();
  private readonly onMapChanged = new LiteEvent<void>();
  private readonly onMapLoaded = new LiteEvent<void>();
  private readonly onPlayerJoined = new LiteEvent<PlayerEntry>();
  private readonly onPlayerLeft = new LiteEvent<PlayerEntry>();
  private readonly onEntitiesUpdated = new LiteEvent<void>();
  private readonly onInteractivesUpdated = new LiteEvent<void>();
  private readonly onPlayedCharacterMoving = new LiteEvent<number[]>();
  private account: Account;
  private _joinedFight: boolean;
  private _firstTime: boolean = true;

  constructor(account: Account) {
    this.account = account;
  }

  public clear() {
    // this._joinedFight = false;
    this.data = null;
    this.area = null;
    this.subArea = null;
    this.posX = 0;
    this.posY = 0;
    this._firstTime = true;
  }

  public async waitMapChange(maxDelayInSeconds: number): Promise<boolean> {
    let mapChanged = false;
    const accountMapChanged = () => {
      mapChanged = true;
    };
    this.account.game.map.onMapChanged.on(accountMapChanged);
    for (
      let i = 0;
      i < maxDelayInSeconds &&
      !mapChanged &&
      this.account.state !== AccountStates.FIGHTING &&
      this.account.scripts.running;
      i++
    ) {
      await sleep(1000);
    }
    this.account.game.map.onMapChanged.off(accountMapChanged);
    return mapChanged;
  }

  public isCellTeleportable(cellId: number): boolean {
    return this.teleportableCells.includes(cellId);
  }

  public getStatedElement(elementId: number) {
    return this._statedElements.has(elementId)
      ? this._statedElements.get(elementId)
      : null;
  }

  public getInteractiveElement(elementId: number) {
    return this._interactives.has(elementId)
      ? this._interactives.get(elementId)
      : null;
  }

  public canFight(
    minMonsters = 1,
    maxMonsters = 8,
    minLevel = 1,
    maxLevel = 1000,
    forbiddenMonsters: number[] = null,
    mandatoryMonsters: number[] = null
  ): boolean {
    return (
      this.getMonstersGroup(
        minMonsters,
        maxMonsters,
        minLevel,
        maxLevel,
        forbiddenMonsters,
        mandatoryMonsters
      ).length > 0
    );
  }

  public getMonstersGroup(
    minMonsters = 1,
    maxMonsters = 8,
    minLevel = 1,
    maxLevel = 1000,
    forbiddenMonsters: number[] = null,
    mandatoryMonsters: number[] = null
  ): MonstersGroupEntry[] {
    const monstersGroups: MonstersGroupEntry[] = [];

    for (const monstersGroup of this.monstersGroups) {
      // In case the group was blacklisted
      if (this.blacklistedMonsters.includes(monstersGroup.cellId)) {
        continue;
      }

      if (
        monstersGroup.monstersCount < minMonsters ||
        monstersGroup.monstersCount > maxMonsters
      ) {
        continue;
      }

      if (
        monstersGroup.totalLevel < minLevel ||
        monstersGroup.totalLevel > maxLevel
      ) {
        continue;
      }

      let valid = true;
      if (forbiddenMonsters !== null) {
        for (const m of forbiddenMonsters) {
          if (monstersGroup.containsMonster(m)) {
            valid = false;
            break;
          }
        }
      }

      // Only check for mandatory monsters if the group passed the forbidden monsters test
      if (mandatoryMonsters !== null && valid) {
        for (const m of mandatoryMonsters) {
          if (!monstersGroup.containsMonster(m)) {
            valid = false;
            break;
          }
        }
      }

      // If the group is still valid, then it's the one!
      if (valid) {
        monstersGroups.push(monstersGroup);
      }
    }

    return monstersGroups;
  }

  public isOnMap(coords: string): boolean {
    return coords === this.id.toString() || coords === this.currentPosition;
  }

  public getPlayer(id: number): PlayerEntry {
    if (this.playedCharacter !== null && this.playedCharacter.id === id) {
      return this.playedCharacter;
    }

    return this._players.has(id) ? this._players.get(id) : null;
  }

  public async UpdateMapComplementaryInformationsDataMessage(
    message: MapComplementaryInformationsDataMessage
  ) {
    this.account.logger.logDebug(
      LanguageManager.trans("map"),
      LanguageManager.trans("getMCIDM", message.mapId)
    );
    const start = performance.now();
    const sameMap = this.data && message.mapId === this.id;
    this.data = await MapsManager.getMap(message.mapId);
    const mp = (await DataManager.get<MapPositions>(
      DataTypes.MapPositions,
      this.id
    ))[0];
    const subArea = (await DataManager.get<SubAreas>(
      DataTypes.SubAreas,
      message.subAreaId
    ))[0];
    const area = (await DataManager.get<Areas>(
      DataTypes.Areas,
      subArea.object.areaId
    ))[0];

    this.subArea = subArea.object.nameId;
    this.area = area.object.nameId;
    this.posX = mp.object.posX;
    this.posY = mp.object.posY;

    const stop = performance.now();
    this.account.logger.logDebug(
      LanguageManager.trans("map"),
      LanguageManager.trans("gotMapInfos", this.currentPosition, stop - start)
    );

    this._players = new Map<number, PlayerEntry>();
    this._npcs = new Map<number, NpcEntry>();
    this._monstersGroups = new Map<number, MonstersGroupEntry>();
    this._interactives = new Map<number, InteractiveElementEntry>();
    this._doors = new Map<number, ElementInCellEntry>();
    this._statedElements = new Map<number, StatedElementEntry>();
    this._phenixs = new Map<number, ElementInCellEntry>();
    this._lockedStorages = new Map<number, ElementInCellEntry>();
    this.teleportableCells = [];
    this.blacklistedMonsters = [];
    this.zaap = null;
    this.zaapi = null;

    // Entities
    for (const actor of message.actors) {
      if (actor._type === "GameRolePlayCharacterInformations") {
        const parsed = actor as GameRolePlayCharacterInformations;
        if (parsed.contextualId === this.account.game.character.id) {
          this.playedCharacter = new PlayerEntry(parsed);
        } else {
          const pe = new PlayerEntry(parsed);
          if (pe.name.startsWith("[")) {
            Pushbullet.sendNotification(
              NotificationType.MOD_ON_MAP,
              this.account,
              {
                senderName: pe.name
              }
            );
          }
          this._players.set(parsed.contextualId, pe);
        }
      } else if (actor._type === "GameRolePlayMutantInformations") {
        const parsed = actor as GameRolePlayMutantInformations;
        if (parsed.contextualId === this.account.game.character.id) {
          this.playedCharacter = new PlayerEntry(parsed);
        } else {
          this._players.set(parsed.contextualId, new PlayerEntry(parsed));
        }
      } else if (
        actor._type === "GameRolePlayNpcInformations" ||
        actor._type === "GameRolePlayNpcWithQuestInformations"
      ) {
        const parsed = actor as GameRolePlayNpcInformations;
        this._npcs.set(actor.contextualId, await NpcEntry.setup(parsed));
      } else if (actor._type === "GameRolePlayGroupMonsterInformations") {
        const parsed = actor as GameRolePlayGroupMonsterInformations;
        this._monstersGroups.set(
          actor.contextualId,
          await MonstersGroupEntry.setup(parsed)
        );
      }
    }

    for (const interactive of message.interactiveElements) {
      this._interactives.set(
        interactive.elementId,
        new InteractiveElementEntry(interactive)
      );
    }
    for (const stated of message.statedElements) {
      this._statedElements.set(
        stated.elementId,
        new StatedElementEntry(stated)
      );
    }

    // Doors
    for (const [
      cellId,
      graphicalElements
    ] of this.data.midgroundLayer.entries()) {
      for (const graph of graphicalElements) {
        // Check for teleportable cells
        if (graph.g === 21000) {
          this.teleportableCells.push(cellId);
        } else {
          // Check for other usable interactives (like doors)
          const interactive = this.getInteractiveElement(graph.id);

          if (interactive === null) {
            continue;
          }

          // Check if this element is a phenix
          // (a phenix doesn't have skills that's why we check here)
          if (graph.g === 7521) {
            this._phenixs.set(
              graph.id,
              new ElementInCellEntry(interactive, cellId)
            );
          }

          if (!interactive.usable) {
            continue;
          }

          // Zaap
          if (graph.g === 15363 || graph.g === 38003) {
            this.zaap = new ElementInCellEntry(interactive, cellId);
          } else if (graph.g === 15004 || graph.g === 9541) {
            // Zaapi
            this.zaapi = new ElementInCellEntry(interactive, cellId);
          } else if (graph.g === 12367) {
            // Locked Storages
            this._lockedStorages.set(
              graph.id,
              new ElementInCellEntry(interactive, cellId)
            );
          } else if (
            MapGame.doorTypeIds.includes(interactive.elementTypeId) &&
            MapGame.doorSkillIds.includes(interactive.enabledSkills[0].id)
          ) {
            this._doors.set(
              graph.id,
              new ElementInCellEntry(interactive, cellId)
            );
          }
        }
      }
    }

    // Only trigger the event when we actually changed the map
    // IDK why DT has this, but there is a possibility that we get a second MCIDM for the same map
    if (!sameMap || this._joinedFight) {
      this._joinedFight = false;
      this.account.logger.logDebug(
        LanguageManager.trans("map"),
        LanguageManager.trans("triggerMapChanged")
      );
      this.onMapChanged.trigger();
      if (this._firstTime) {
        this._firstTime = false;
        this.onMapLoaded.trigger();
      }
    } else {
      this.account.logger.logWarning(
        LanguageManager.trans("map"),
        LanguageManager.trans("sameMap")
      );
    }
  }

  public async UpdateGameRolePlayShowActorMessage(message: any) {
    if (message.informations._type === "GameRolePlayCharacterInformations") {
      const pe = new PlayerEntry(message.informations);
      if (pe.name.startsWith("[")) {
        Pushbullet.sendNotification(NotificationType.MOD_ON_MAP, this.account, {
          senderName: pe.name
        });
      }
      this._players.set(pe.id, pe);
      this.onEntitiesUpdated.trigger();
      this.onPlayerJoined.trigger(pe);
    } else if (
      message.informations._type === "GameRolePlayMutantInformations"
    ) {
      const pe = new PlayerEntry(message.informations);
      this._players.set(pe.id, pe);
      this.onPlayerJoined.trigger(pe);
      this.onEntitiesUpdated.trigger();
    } else if (
      message.informations._type === "GameRolePlayGroupMonsterInformations"
    ) {
      const mge = await MonstersGroupEntry.setup(message.informations);
      this._monstersGroups.set(message.informations.contextualId, mge);
      this.onEntitiesUpdated.trigger();
    }
  }

  public async UpdateGameContextRemoveElementMessage(
    message: GameContextRemoveElementMessage
  ) {
    this.removeEntity(message.id);
  }

  public async UpdateGameContextRemoveMultipleElementsMessage(
    message: GameContextRemoveMultipleElementsMessage
  ) {
    for (const e of message.id) {
      this.removeEntity(e);
    }
  }

  public async UpdateGameMapMovementMessage(message: any) {
    const player = this.getPlayer(message.actorId);
    if (player !== null) {
      player.UpdateGameMapMovementMessage(message);

      if (player === this.playedCharacter) {
        this.onPlayedCharacterMoving.trigger(message.keyMovements);
      } else {
        this.onEntitiesUpdated.trigger();
      }
    } else {
      const mg = this._monstersGroups.get(message.actorId);

      if (mg) {
        mg.UpdateGameMapMovementMessage(message);
        this.onEntitiesUpdated.trigger();
      }
    }
  }

  public async UpdateInteractiveElementUpdatedMessage(message: any) {
    if (this._interactives.delete(message.interactiveElement.elementId)) {
      this._interactives.set(
        message.interactiveElement.elementId,
        new InteractiveElementEntry(message.interactiveElement)
      );
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateInteractiveMapUpdateMessage(message: any) {
    this._interactives = new Map<number, InteractiveElementEntry>();

    for (const inter of message.interactiveElements) {
      this._interactives.set(
        inter.elementId,
        new InteractiveElementEntry(inter)
      );
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateStatedElementUpdatedMessage(message: any) {
    if (this._statedElements.delete(message.statedElement.elementId)) {
      this._statedElements.set(
        message.statedElement.elementId,
        new StatedElementEntry(message.statedElement)
      );
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateStatedMapUpdateMessage(message: any) {
    this._statedElements = new Map<number, StatedElementEntry>();

    for (const stated of message.statedElements) {
      this._statedElements.set(
        stated.elementId,
        new StatedElementEntry(stated)
      );
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateGameFightJoinMessage(message: any) {
    this._joinedFight = true;
  }

  public async UpdateGameRolePlayShowChallengeMessage(
    message: GameRolePlayShowChallengeMessage
  ) {
    // TODO: Remove monsters from the map?
  }

  private removeEntity(id: number) {
    const p = this.getPlayer(id);
    if (p !== null) {
      this._players.delete(id);
      this.onPlayerLeft.trigger(p);
      this.onEntitiesUpdated.trigger();
    } else if (this._monstersGroups.delete(id)) {
      this.onEntitiesUpdated.trigger();
    }
  }
}
