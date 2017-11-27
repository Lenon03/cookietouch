import Account from "@account";
import { List } from "linqts";
import Group from "./Group";

export default class Grouping {
  private _group: Group;
  private _missingMembers: List<Account>;

  // private get ChiefPosX() {
  //   return this._group.chief.game.map.posX;
  // }
  //
  // private get ChiefPosY() {
  //   return this._group.chief.game.map.posY;
  // }
  //
  // constructor(group: Group) {
  //   this._group = group;
  // }
  //
  // public async groupMembers() {
  //   const missingMembers = this._group.members
  // }
}
