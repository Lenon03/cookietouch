import FightTeamInformations from "@/protocol/network/types/FightTeamInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameFightUpdateTeamMessage extends Message {
  public fightId: number;
  public team: FightTeamInformations;

  constructor(fightId = 0, team: FightTeamInformations) {
    super();
    this.fightId = fightId;
    this.team = team;

  }
}
