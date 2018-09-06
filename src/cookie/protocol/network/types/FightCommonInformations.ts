import FightOptionsInformations from "@/protocol/network/types/FightOptionsInformations";
import FightTeamInformations from "@/protocol/network/types/FightTeamInformations";
import Type from "@/protocol/network/types/Type";

export default class FightCommonInformations extends Type {
  public fightTeams: FightTeamInformations[];
  public fightTeamsPositions: number;
  public fightTeamsOptions: FightOptionsInformations[];
  public fightId: number;
  public fightType: number;

  constructor(
    fightId = 0,
    fightType = 0,
    fightTeams: FightTeamInformations[],
    fightTeamsPositions = 0,
    fightTeamsOptions: FightOptionsInformations[]
  ) {
    super();
    this.fightId = fightId;
    this.fightTeams = fightTeams;
    this.fightTeamsPositions = fightTeamsPositions;
    this.fightTeamsOptions = fightTeamsOptions;
    this.fightType = fightType;
  }
}
