import Message from "@/protocol/network/messages/Message";
import FightTeamInformations from "@/protocol/network/types/FightTeamInformations";

export default class GameFightUpdateTeamMessage extends Message {
  public fightId: number;
  public team: FightTeamInformations;

  constructor(fightId = 0, team: FightTeamInformations) {
    super();
    this.fightId = fightId;
    this.team = team;

  }
}
