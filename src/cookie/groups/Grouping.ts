import Account from "@account";
import { MapChangeDirections } from "@game/managers/movements/MapChangeDirections";
import { Deferred } from "@utils/Deferred";
import { sleep } from "@utils/Time";
import { List } from "linqts";
import Group from "./Group";

export default class Grouping {
  private _group: Group;
  private _missingMembers: List<Account>;

  private get ChiefPosX() {
    return this._group.chief.game.map.posX;
  }

  private get ChiefPosY() {
    return this._group.chief.game.map.posY;
  }

  constructor(group: Group) {
    this._group = group;
  }

  public async groupMembers() {
    const missingMembers = this._group.members.Where((m) => m.game.map.currentPosition !== this._group.chief.game.map.currentPosition);
    if (this._missingMembers.Count() === 0) {
      return;
    }
    this._missingMembers = missingMembers;
    this._missingMembers.ForEach(async (m) => {
      await this.groupMissingMember(m);
    });
  }

  private async groupMissingMember(missingMember: Account) {
    let tcs = Deferred<boolean>();
    const mapChanged = async () => {
      await sleep(1500);
      tcs.resolve(true);
    };
    missingMember.game.map.MapChanged.on(mapChanged);
    while (this._group.chief.scripts.enabled &&
      missingMember.game.map.currentPosition !== this._group.chief.game.map.currentPosition) {
        tcs = Deferred<boolean>();
        this.moveMissingMember(missingMember);
        await tcs.promise;
    }
    missingMember.game.map.MapChanged.off(mapChanged);
  }

  private moveMissingMember(missingMember: Account) {
    let dir = MapChangeDirections.NONE;
    // TOP
    if (this.ChiefPosY < missingMember.game.map.posY) {
      dir = MapChangeDirections.Top;
    }
    // Bottom
    if (this.ChiefPosY > missingMember.game.map.posY) {
      dir = MapChangeDirections.Bottom;
    }
    // Left
    if (this.ChiefPosX < missingMember.game.map.posX) {
      dir = MapChangeDirections.Left;
    }
    // Right
    if (this.ChiefPosX > missingMember.game.map.posX) {
      dir = MapChangeDirections.Right;
    }
    if (dir === MapChangeDirections.NONE) {
      return;
    }
    missingMember.logger.logDebug("Grouping", `${MapChangeDirections[dir]}`);
    missingMember.game.managers.movements.changeMap(dir);
  }
}
