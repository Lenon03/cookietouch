import GameRolePlayCharacterInformations from "../../../protocol/network/types/GameRolePlayCharacterInformations";
import MovableEntity from "./MovableEntity";

export default class PlayerEntry extends MovableEntity {
  public id: number;
  public name: string;
  public level: number;

  constructor(infos: GameRolePlayCharacterInformations) {
    super();
    this.id = infos.contextualId;
    this.name = infos.name;
    this.cellId = infos.disposition.cellId;
    this.level = infos.alignmentInfos.characterPower - this.id;
  }
}
