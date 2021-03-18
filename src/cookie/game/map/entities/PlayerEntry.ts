import MovableEntity from "@/game/map/entities/MovableEntity";
import GameRolePlayCharacterInformations from "@/protocol/network/types/GameRolePlayCharacterInformations";
import GameRolePlayMutantInformations from "@/protocol/network/types/GameRolePlayMutantInformations";

export default class PlayerEntry extends MovableEntity {
  public id: number = 0;
  public name: string = "";
  public level: number = 0;

  constructor(
    infos: GameRolePlayCharacterInformations | GameRolePlayMutantInformations
  ) {
    super();
    if (infos._type === "GameRolePlayCharacterInformations") {
      infos = infos as GameRolePlayCharacterInformations;
      this.id = infos.contextualId;
      this.name = infos.name;
      this.cellId = infos.disposition.cellId;
      this.level = infos.alignmentInfos.characterPower - this.id;
    } else if (infos._type === "GameRolePlayMutantInformations") {
      infos = infos as GameRolePlayMutantInformations;
      this.id = infos.contextualId;
      this.name = infos.name;
      this.cellId = infos.disposition.cellId;
      this.level = 0; // TODO: get monster level maybe?
    }
  }

  public UpdateTeleportOnSameMapMessage(message: any) {
    this.cellId = message.cellId;
  }
}
