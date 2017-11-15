import Account from "../../Account";
import HouseInformations from "../../protocol/network/types/HouseInformations";
import Dictionary from "../../utils/Dictionary";
import LiteEvent from "../../utils/LiteEvent";
import DataManager from "../managers/data/";
import DataClasses from "../managers/data/classes";
import MapData from "../managers/movements/Map";
import { MapChangeDirections } from "../managers/movements/MapChangeDirections";
import { MovementRequestResults } from "../managers/movements/MovementRequestResults";
import MonsterEntry from "./entities/MonsterEntry";
import MonstersGroupEntry from "./entities/MonstersGroupEntry";
import NpcEntry from "./entities/NpcEntry";
import PlayerEntry from "./entities/PlayerEntry";
import ElementInCellEntry from "./interactives/ElementInCellEntry";
import InteractiveElementEntry from "./interactives/InteractiveElementEntry";
import StatedElementEntry from "./interactives/StatedElementEntry";

export default class Map {

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

  // to keep?
  public houses: any[];
  public houseInformations: HouseInformations[] = [];
  public obstacles: any[];
  // end to keep

  get players() { return this._players.values(); }
  get npcs() { return this._npcs.values(); }
  get monstersGroups() { return this._monstersGroups.values(); }
  get interactives() { return this._interactives.values(); }
  get doors() { return this._doors.values(); }
  get statedElements() { return this._statedElements.values(); }
  get phenixs() { return this._phenixs.values(); }
  get lockedStorages() { return this._lockedStorages.values(); }
  get id() { return this.data.id; }
  get currentPosition() { return `${this.posX},${this.posY}`; }

  get occupiedCells(): number[] {
    const pCells = this.players.map((p) => p.cellId);
    const mCells = this.monstersGroups.map((m) => m.cellId);
    const nCells = this.npcs.map((n) => n.cellId);
    return pCells.concat(mCells, nCells);
  }

  // Events
  public get MapChanged() { return this.onMapChanged.expose(); }
  public get PlayerJoined() { return this.onPlayerJoined.expose(); }
  public get PlayerLeft() { return this.onPlayerLeft.expose(); }
  public get EntitiesUpdated() { return this.onEntitiesUpdated.expose(); }
  public get InteractivesUpdated() { return this.onInteractivesUpdated.expose(); }
  public get PlayedCharacterMoving() { return this.onPlayedCharacterMoving.expose(); }
  private readonly onMapChanged = new LiteEvent<void>();
  private readonly onPlayerJoined = new LiteEvent<PlayerEntry>();
  private readonly onPlayerLeft = new LiteEvent<PlayerEntry>();
  private readonly onEntitiesUpdated = new LiteEvent<void>();
  private readonly onInteractivesUpdated = new LiteEvent<void>();
  private readonly onPlayedCharacterMoving = new LiteEvent<number[]>();

  private account: Account;
  /* tslint:disable */
  private _players = new Dictionary<number, PlayerEntry>();
  private _npcs = new Dictionary<number, NpcEntry>();
  private _monstersGroups = new Dictionary<number, MonstersGroupEntry>();
  private _interactives = new Dictionary<number, InteractiveElementEntry>();
  private _doors = new Dictionary<number, ElementInCellEntry>();
  private _statedElements = new Dictionary<number, StatedElementEntry>();
  private _phenixs = new Dictionary<number, ElementInCellEntry>();
  private _lockedStorages = new Dictionary<number, ElementInCellEntry>();
  private _joinedFight: boolean;
  /* tslint:enable */

  constructor(account: Account) {
    this.account = account;
  }

  public isCellTeleportable(cellId: number): boolean {
    return this.teleportableCells.includes(cellId);
  }

  public getStatedElement(elementId: number) {
    return this._statedElements.getValue(elementId);
  }

  public getInteractiveElement(elementId: number) {
    return this._interactives.getValue(elementId);
  }

  public canFight(minMonsters = 1, maxMonsters = 8, minLevel = 1, maxLevel = 1000,
                  forbiddenMonsters: number[] = null,
                  mandatoryMonsters: number[] = null): boolean {
    return this.getMonstersGroup(minMonsters, maxMonsters, minLevel,
      maxLevel, forbiddenMonsters, mandatoryMonsters).length > 0;
  }

  public getMonstersGroup(minMonsters = 1, maxMonsters = 8, minLevel = 1, maxLevel = 1000,
                          forbiddenMonsters: number[] = null,
                          mandatoryMonsters: number[] = null): MonstersGroupEntry[] {
    const monstersGroups: MonstersGroupEntry[] = [];

    for (const monstersGroup of this.monstersGroups) {
      // In case the group was blacklisted
      if (this.blacklistedMonsters.includes(monstersGroup.cellId)) {
        continue;
      }

      if (monstersGroup.monstersCount < minMonsters || monstersGroup.totalLevel > maxLevel) {
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

      if (mandatoryMonsters !== null && valid) {
        for (const m of mandatoryMonsters) {
          if (!monstersGroup.containsMonster(m)) {
            valid = false;
            break;
          }
        }
      }

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

    return this._players.getValue(id);
  }

  public async UpdateMapComplementaryInformationsDataMessage(account: Account, message: any) {
    console.log("Get MCIDM for map " + message.mapId);
    const start = performance.now();
    const sameMap = this.data && message.mapId === this.id;
    this.data = await account.game.managers.movements.updateMap(message.mapId);
    const mp = (await DataManager.get(DataClasses.MapPositions, this.id))[0];
    const subArea = (await DataManager.get(DataClasses.SubAreas, message.subAreaId))[0];
    const area = (await DataManager.get(DataClasses.Areas, subArea.object.areaId))[0];

    this.subArea = subArea.object.nameId;
    this.area = area.object.nameId;
    this.posX = mp.object.posX;
    this.posY = mp.object.posY;

    const stop = performance.now();
    console.log(`Got map infos ${this.currentPosition} in ${stop - start} ms`);

    this._players = new Dictionary<number, PlayerEntry>();
    this._npcs = new Dictionary<number, NpcEntry>();
    this._monstersGroups = new Dictionary<number, MonstersGroupEntry>();
    this._interactives = new Dictionary<number, InteractiveElementEntry>();
    this._doors = new Dictionary<number, ElementInCellEntry>();
    this._statedElements = new Dictionary<number, StatedElementEntry>();
    this._phenixs = new Dictionary<number, ElementInCellEntry>();
    this._lockedStorages = new Dictionary<number, ElementInCellEntry>();
    this.teleportableCells = [];
    this.blacklistedMonsters = [];
    this.zaap = null;

    for (const actor of message.actors) {
      if (actor._type === "GameRolePlayCharacterInformations") {
        if (actor.contextualId === account.game.character.id) {
          this.playedCharacter = new PlayerEntry(actor);
        } else {
          this._players.add(actor.contextualId, new PlayerEntry(actor));
        }
      } else if (actor._type === "GameRolePlayNpcInformations") {
        this._npcs.add(actor.contextualId, new NpcEntry(actor));
      } else if (actor._type === "GameRolePlayGroupMonsterInformations") {
        this._monstersGroups.add(actor.contextualId, new MonstersGroupEntry(actor));
      }
    }

    for (const interactive of message.interactiveElements) {
      if (interactive._type === "InteractiveElement") {
        this._interactives.add(interactive.elementId, new InteractiveElementEntry(interactive));
      }
    }

    for (const stated of message.statedElements) {
      if (stated._type === "StatedElement") {
        this._statedElements.add(stated.elementId, new StatedElementEntry(stated));
      }
    }

    // TODO: Doors, Zaap, Zaapi, Locked Storage

    if (!sameMap || this._joinedFight) {
      this._joinedFight = false;
      this.onMapChanged.trigger();
    } else {
      // Same map
    }
  }

  public async UpdateGameRolePlayShowActorMessage(account: Account, message: any) {
    if (message.informations._type === "GameRolePlayCharacterInformations") {
      const pe = new PlayerEntry(message.informations);
      this._players.add(pe.id, pe);
      this.onPlayerJoined.trigger(pe);
    } else if (message.informations._type === "GameRolePlayGroupMonsterInformations") {
      const mge = new MonstersGroupEntry(message.informations);
      this._monstersGroups.add(message.informations.contextualId, mge);
      this.onEntitiesUpdated.trigger();
    }
  }

  public async UpdateGameContextRemoveElementMessage(account: Account, message: any) {
    this.removeEntity(message.id);
  }

  public async UpdateGameContextRemoveMultipleElementMessage(account: Account, message: any) {
    for (const e of message.Id) {
      this.removeEntity(e);
    }
  }

  public async UpdateGameMapMovementMessage(account: Account, message: any) {
    const player = this.getPlayer(message.actorId);
    if (player !== null) {
      player.UpdateGameMapMovementMessage(message);

      if (player === this.playedCharacter) {
        this.onPlayedCharacterMoving.trigger(message.keyMovements);
      } else {
        this.onEntitiesUpdated.trigger();
      }
    } else {
      const mg = this._monstersGroups.getValue(message.actorId);

      if (mg) {
        mg.UpdateGameMapMovementMessage(message);
        this.onEntitiesUpdated.trigger();
      }
    }
  }

  public async UpdateInteractiveElementUpdatedMessage(account: Account, message: any) {
    if (this._interactives.remove(message.interactiveElement.elementId)) {
      this._interactives.add(message.interactiveElement.elementId,
        new InteractiveElementEntry(message.interactiveElement));
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateInteractiveMapUpdateMessage(account: Account, message: any) {
    this._interactives = new Dictionary<number, InteractiveElementEntry>();

    for (const inter of message.interactiveElements) {
      this._interactives.add(inter.elementId, new InteractiveElementEntry(inter));
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateStatedElementUpdatedMessage(account: Account, message: any) {
    if (this._statedElements.remove(message.statedElement.ElementId)) {
      this._statedElements.add(message.statedElement.ElementId, new StatedElementEntry(message.statedElement));
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateStatedMapUpdateMessage(account: Account, message: any) {
    this._statedElements = new Dictionary<number, StatedElementEntry>();

    for (const stated of message.statedElements) {
      this._statedElements.add(stated.elementId, new StatedElementEntry(stated));
    }

    this.onInteractivesUpdated.trigger();
  }

  public async UpdateGameFightJoinMessage(account: Account, message: any) {
    this._joinedFight = true;
  }

  private removeEntity(id: number) {
    const p = this.getPlayer(id);
    console.log("Remove player ", p);
    if (p !== null) {
      this._players.remove(id);
      this.onPlayerLeft.trigger(p);
      this.onEntitiesUpdated.trigger();
    } else if (this._monstersGroups.remove(id)) {
      this.onEntitiesUpdated.trigger();
    }
  }
}
