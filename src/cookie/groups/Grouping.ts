import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import { MapChangeDirections } from "@/game/managers/movements/MapChangeDirections";
import Group from "@/groups/Group";
import { Deferred, IDeferred } from "@/utils/Deferred";
import { sleep } from "@/utils/Time";
import { List } from "linqts";

export default class Grouping {
  private _group: Group;
  private _missingMembers: List<Account>;

  constructor(group: Group) {
    this._group = group;
    this._missingMembers = new List();
  }

  private get ChiefPosX() {
    return this._group.chief.game.map.posX;
  }

  private get ChiefPosY() {
    return this._group.chief.game.map.posY;
  }

  public async groupMembers() {
    const missingMembers = this._group.members.Where(
      m =>
        m !== undefined &&
        m.game.map.currentPosition !==
          this._group.chief.game.map.currentPosition
    );
    if (this._missingMembers.Count() === 0) {
      return;
    }
    this._missingMembers = missingMembers;
    this._missingMembers.ForEach(async m => {
      if (!m) {
        return;
      }
      await this.groupMissingMember(m);
    });
  }

  private async groupMissingMember(missingMember: Account) {
    let tcs: IDeferred<boolean> | null = null;
    const mapChanged = async () => {
      await sleep(1500);
      tcs!.resolve(true);
    };
    missingMember.game.map.MapChanged.on(mapChanged);
    while (
      this._group.chief.scripts.enabled &&
      missingMember.game.map.currentPosition !==
        this._group.chief.game.map.currentPosition
    ) {
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
    missingMember.logger.logDebug(
      LanguageManager.trans("grouping"),
      `${MapChangeDirections[dir]}`
    );
    missingMember.game.managers.movements.changeMap(dir);
  }
}
