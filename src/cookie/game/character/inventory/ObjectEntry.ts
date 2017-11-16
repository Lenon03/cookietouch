import { CharacterInventoryPositionEnum } from "../../../protocol/enums/CharacterInventoryPositionEnum";

export default class ObjectEntry {
  public gid: number;
  public uid: number;
  public quantity: number;
  public position: CharacterInventoryPositionEnum;

  constructor() {
    //
  }
}
