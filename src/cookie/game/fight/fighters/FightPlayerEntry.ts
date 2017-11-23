import GameFightCharacterInformations from "@protocol/network/types/GameFightCharacterInformations";
import GameFightFighterInformations from "@protocol/network/types/GameFightFighterInformations";
import FighterEntry from "./FighterEntry";

export default class FightPlayerEntry extends FighterEntry {
  public name: string;
  public level: number;

  constructor(infos1: GameFightCharacterInformations, infos2: GameFightFighterInformations) {
    super(infos2);
    this.name = infos1.name;
    this.level = infos1.level;
  }
}
