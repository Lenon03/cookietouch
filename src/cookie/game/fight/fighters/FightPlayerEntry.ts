import GameFightCharacterInformations from "@protocol/network/types/GameFightCharacterInformations";
import GameFightFighterInformations from "@protocol/network/types/GameFightFighterInformations";
import FighterEntry from "./FighterEntry";

export default class FightPlayerEntry extends FighterEntry {
  public name: string;
  public level: number;

  constructor(infos: GameFightFighterInformations) {
    super(infos);
    if ((infos as any)._type === "GameFightCharacterInformations") {
      this.name = (infos as any).name;
      this.level = (infos as any).level;
    } else if ((infos as any)._type === "GameFightMutantInformations") {
      this.name = (infos as any).name;
      this.level = 0; // TODO: Get the monster level
    }
  }
}
