import Account from "../../Account";
import HouseInformations from "../../protocol/network/types/HouseInformations";
import Dictionary from "../../utils/Dictionary";
import LiteEvent from "../../utils/LiteEvent";
import { CharacterState } from "../character/CharacterState";
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
  public playedCharacter: PlayerEntry;
  public teleportableCells: number[] = [];
  public blacklistedMonsters: number[] = [];
  public zaap: ElementInCellEntry;
  public zaapi: ElementInCellEntry;

  // to keep?
  public houses: any[];
  public houseInformations: HouseInformations[] = [];
  public obstacles: any[];
  // end to keep

  get players() { return this._players.values(); }
  get npcs() { return this._npcs.values(); }
  get monstersGroups() { return this._monstersGroup.values(); }
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
  public get PlayerCharacterMoving() { return this.onPlayerCharacterMoving.expose(); }
  private readonly onMapChanged = new LiteEvent<void>();
  private readonly onPlayerJoined = new LiteEvent<PlayerEntry>();
  private readonly onPlayerLeft = new LiteEvent<PlayerEntry>();
  private readonly onEntitiesUpdated = new LiteEvent<void>();
  private readonly onInteractivesUpdated = new LiteEvent<void>();
  private readonly onPlayerCharacterMoving = new LiteEvent<number[]>();

  private account: Account;
  /* tslint:disable */
  private _players = new Dictionary<number, PlayerEntry>();
  private _npcs = new Dictionary<number, NpcEntry>();
  private _monstersGroup = new Dictionary<number, MonstersGroupEntry>();
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
}
