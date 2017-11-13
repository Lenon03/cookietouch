import axios from "axios";
import { PathFinder } from "../dofus/PathFinder";
import { Account } from "../game/Account";

export class MovementsManager {

  private account: Account;
  private jsonMap: {};

  constructor(account: Account) {
    this.account = account;
    PathFinder.Init();
  }

  public updateMap(mapId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get(this.account.haapi.config.assetsUrl + "/maps/" + mapId + ".json")

        .then((response) => this.jsonMap = response.data)
        .then(() => PathFinder.fillPathGrid(this.jsonMap))
        .then(() => resolve());
    });
  }

  public moveToCellId(cellId: number): void {
    if (this.account.character.cellId === cellId) { return; }

    const path = PathFinder.getPath(this.account.character.cellId, cellId);
    console.log(PathFinder.logPath(path));

    this.account.client.sendMessage("GameMapMovementRequestMessage", {
      keyMovements: PathFinder.compressPath(path),
      mapId: this.account.character.map.mapId,
    });

    this.confirmMove(path);
  }

  public confirmMove(path: number[]): void {
    setTimeout(() => {
      this.account.client.sendMessage("GameMapMovementConfirmMessage", null);
    }, 250 * path.length);
  }
}
