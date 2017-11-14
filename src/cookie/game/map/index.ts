import Account from "../../Account";
import { MapChangeDirections } from "../managers/movements/MapChangeDirections";
import { CharacterState } from "./../character/CharacterState";

export default class Map {

  public actors: any[];
  public fights: any[];
  public houses: any[];
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

  private events() {
    this.account.dispatcher.register("GameMapMovementConfirmMessage",
      (account: Account, data: any) => {
        account.game.character.state = CharacterState.IDLE;

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
  }

  private HandleGameMapMovementMessage(account: Account, data: any) {
    const last = data.keyMovements[data.keyMovements.length - 1];

    if (data.actorId === account.game.character.infos.id) {
      console.log("OLD CELL ", account.game.character.cellId);

      account.game.character.cellId = last;
      account.game.character.state = CharacterState.MOVING;

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

    // const randomCell = Math.floor((Math.random() * 560) + 0);
    // console.log("Go To Cell: ", randomCell);
    // account.game.character.managers.movements.moveToCell(randomCell);

    const result = account.game.managers.movements.changeMap(MapChangeDirections.Top);
    console.log("Changed? => ", result);
  }

  private HandleGameContextRemoveElementMessage(account: Account, data: any) {
    // TODO: Show to Sapientia how to remove properly element from an array
    const actor = this.account.game.map.actors.filter((p: any) => p.contextualId === data.id);
    this.account.game.map.actors.splice(this.account.game.map.actors.indexOf(actor), 1);
  }

  private HandleGameRolePlayShowActorMessage(account: Account, data: any) {
    account.game.map.actors.push(data.informations);
  }
}
