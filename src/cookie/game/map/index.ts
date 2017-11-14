import Account from "../../Account";
import { CharacterState } from "../character/CharacterState";
import { MapChangeDirections } from "../managers/movements/MapChangeDirections";
import { MovementRequestResults } from "../managers/movements/MovementRequestResults";
import CharacterInformations from "./entity/GameRolePlayCharacterInformations";
import GroupMonsterInformations from "./entity/GameRolePlayGroupMonsterInformations";
import NpcInformations from "./entity/GameRolePlayNpcInformations";
import NpcWithQuestInformations from "./entity/GameRolePlayNpcWithQuestInformations";
import HouseInformations from "./entity/HouseInformations";

export default class Map {

  // ACTORS
  public actors: any[] = [];
  public npcWithQuestInformations: NpcWithQuestInformations[] = [];
  public npcInformations: NpcInformations[] = [];
  public characterInformations: CharacterInformations[] = [];
  public groupMonsterInformations: GroupMonsterInformations[] = [];
  // END ACTORS
  public fights: any[];
  // HOUSES
  public houses: any[];
  public houseInformations: HouseInformations[] = [];
  // HOUSES
  public interactiveElements: any[];
  public id: number;
  public statedElements: any[];
  public obstacles: any[];
  public subAreaId: number;

  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.register();
    this.events();
  }

  public occupiedCells(): number[] {
    // TODO: TODO.
    return [];
  }

  private events() {
    this.account.dispatcher.register("GameMapMovementConfirmMessage",
      (account: Account, data: any) => {
        console.log("CHARACTER STATE (confirm): ",
          CharacterState[account.game.character.state], account.game.character.cellId);
      }, this);
  }

  private register() {
    this.account.dispatcher.register("MapComplementaryInformationsDataMessage",
      this.HandleMapComplementaryInformationsDataMessage, this);
    this.account.dispatcher.register("CurrentMapMessage",
      this.HandleCurrentMapMessage, this);
    this.account.dispatcher.register("GameMapMovementMessage",
      this.HandleGameMapMovementMessage, this);
    this.account.dispatcher.register("GameContextRemoveElementMessage",
      this.HandleGameContextRemoveElementMessage, this);
    this.account.dispatcher.register("GameRolePlayShowActorMessage",
      this.HandleGameRolePlayShowActorMessage, this);
    this.account.dispatcher.register("MapFightCountMessage",
      this.HandleHandleMapFightCountMessage, this);
    this.account.dispatcher.register("CharacterLevelUpInformationMessage",
      this.HandleCharacterLevelUpInformationMessage, this);
  }

  private HandleGameMapMovementMessage(account: Account, data: any) {
    const last = data.keyMovements[data.keyMovements.length - 1];
    console.log("MOVED MOVED MOVED MOVED MOVED MOVED MOVED MOVED MOVED");
    if (data.actorId === account.game.character.infos.id) {
      console.log("OLD CELL ", account.game.character.cellId);

      account.game.character.cellId = last;

      console.log("CHARACTER STATE (moving): ",
        CharacterState[account.game.character.state], account.game.character.cellId);
    }

    // TODO: Update cellId on the actors
  }

  private HandleCurrentMapMessage(account: Account, data: any) {
    account.network.sendMessage("MapInformationsRequestMessage", {
      mapId: data.mapId,
    });

    account.game.managers.movements.updateMap(data.mapId);
  }

  private HandleMapComplementaryInformationsDataMessage(account: Account, data: any) {
    account.game.map.actors = data.actors;
    account.game.map.fights = data.fights;
    account.game.map.houses = data.houses;
    account.game.map.interactiveElements = data.interactiveElements;
    account.game.map.id = data.mapId;
    account.game.map.statedElements = data.statedElements;
    account.game.map.obstacles = data.obstacles;
    account.game.map.subAreaId = data.subAreaId;
    account.game.character.cellId = data.actors[0].disposition.cellId;

    this.AddActors(account);
    this.AddHouse(account);
    console.log(this);
    // this.EphemeralMoveCell(account);
  }

  private HandleGameContextRemoveElementMessage(account: Account, data: any) {
    this.account.game.map.actors = this.account.game.map.actors.filter((p: any) => p.contextualId !== data.id);
  }

  private HandleGameRolePlayShowActorMessage(account: Account, data: any) {
    account.game.map.actors.push(data.informations);
  }

  private HandleHandleMapFightCountMessage(account: Account, data: any) {
    console.log("Il y a " + data.fightCount + " combat(s) sur la carte.");
  }

  private HandleCharacterLevelUpInformationMessage(account: Account, data: any) {
    console.log("Le joueur " + data.name + " vient de monter niveau " + data.newLevel + " !");
  }

  private AddActors(account: Account) {
    for (const value of account.game.map.actors) {
      switch (value._type) {
        case "GameRolePlayNpcWithQuestInformations": {
          this.npcWithQuestInformations.push(value);
          break;
        }
        case "GameRolePlayNpcInformations": {
           this.npcInformations.push(value);
           break;
        }
        case "GameRolePlayCharacterInformations": {
           this.characterInformations.push(value);
           break;
        }
        case "GameRolePlayGroupMonsterInformations": {
           this.groupMonsterInformations.push(value);
           break;
        }
      }
    }
  }
  private AddHouse(account: Account) {
    for (const value of account.game.map.houses) {
      this.houseInformations.push(value);
    }
  }

  private EphemeralMoveCell(account: Account) {
     const randomCell = Math.floor((Math.random() * 560) + 0);
     console.log("Go To Cell: ", randomCell);
     const result = account.game.managers.movements.moveToCell(randomCell);
     console.log("Changed Cell? => ", MovementRequestResults[result]);

     // const randomMap = MapChangeDirections.Top;
     // console.log("Go To Map: ", randomMap);
     // const result = account.game.managers.movements.changeMap(randomMap);
     // console.log("Changed Map? => ", result);
  }
}
