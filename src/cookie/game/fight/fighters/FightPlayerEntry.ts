import FighterEntry from "@/game/fight/fighters/FighterEntry";
import GameFightCharacterInformations from "@/protocol/network/types/GameFightCharacterInformations";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMutantInformations from "@/protocol/network/types/GameFightMutantInformations";

export default class FightPlayerEntry extends FighterEntry {
  public name: string;
  public level: number;

  constructor(infos: GameFightFighterInformations) {
    super(infos);
    if (infos._type === "GameFightCharacterInformations") {
      const char = infos as GameFightCharacterInformations;
      this.name = char.name;
      this.level = char.level;
    } else if (infos._type === "GameFightMutantInformations") {
      const char2 = infos as GameFightMutantInformations;
      this.name = char2.name;
      this.level = 0; // TODO: Get the monster level
    }
  }
}
