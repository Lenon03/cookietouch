import Message from "@/protocol/network/messages/Message";
import GameFightFighterLightInformations from "@/protocol/network/types/GameFightFighterLightInformations";

export default class MapRunningFightDetailsMessage extends Message {
  public attackers: GameFightFighterLightInformations[];
  public defenders: GameFightFighterLightInformations[];
  public fightId: number;

  constructor(fightId = 0, attackers: GameFightFighterLightInformations[], defenders: GameFightFighterLightInformations[]) {
    super();
    this.attackers = attackers;
    this.defenders = defenders;
    this.fightId = fightId;
  }
}
