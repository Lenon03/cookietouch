import { Account } from "./Account";
import { CharacterState } from "./CharacterState";

export default class Map {

  public actors: any;
  public fights: any;
  public houses: any;
  public interactiveElements: any;
  public mapId: number;
  public statedElements: any;
  public obstacles: any;
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
            account.character.state = CharacterState.IDLE;

            console.log("CHARACTER STATE (confirm): ", account.character.state, account.character.cellId);
          }, this);
  }

  private register() {
    this.account.dispatcher.register("MapComplementaryInformationsDataMessage",
      this.HandleMapComplementaryInformationsDataMessage, this);
    this.account.dispatcher.register("CurrentMapMessage",
      this.HandleCurrentMapMessage, this);
    this.account.dispatcher.register("GameMapMovementMessage",
      this.HandleGameMapMovementMessage, this);
  }

  private HandleGameMapMovementMessage(account: Account, data: any) {
    if (data.actorId === account.character.infos.id) {
      console.log("OLD CELL ", account.character.cellId);

      const last = data.keyMovements[data.keyMovements.length - 1];
      account.character.cellId = last;
      account.character.state = CharacterState.MOVING;

      console.log("CHARACTER STATE (moving): ", account.character.state, account.character.cellId);
    }
  }

  private HandleCurrentMapMessage(account: Account, data: any) {
    account.client.sendMessage("MapInformationsRequestMessage", {
      mapId: data.mapId,
    });

    account.character.managers.movements.updateMap(data.mapId);
  }

  private HandleMapComplementaryInformationsDataMessage(account: Account, data: any) {
    account.character.map.actors = data.actors;
    account.character.map.fights = data.fights;
    account.character.map.houses = data.houses;
    account.character.map.interactiveElements = data.interactiveElements;
    account.character.map.mapId = data.mapId;
    account.character.map.statedElements = data.statedElements;
    account.character.map.obstacles = data.obstacles;
    account.character.map.subAreaId = data.subAreaId;

    account.character.cellId = data.actors[0].disposition.cellId;

    account.character.managers.movements.moveToCellId(345);
  }
}
