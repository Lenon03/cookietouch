import FightOptionsInformations from "@/protocol/network/types/FightOptionsInformations";
import FightTeamLightInformations from "@/protocol/network/types/FightTeamLightInformations";
import Type from "@/protocol/network/types/Type";

export default class FightExternalInformations extends Type {

  public fightteams: FightTeamLightInformations[];
  public fightteamsoptions: FightOptionsInformations[];
  public fightid: number;
  public fighttype: number;
  public fightstart: number;
  public fightspectatorlocked: boolean;

  constructor(fightid = 0, fighttype = 0, fightstart = 0, fightspectatorlocked = false,
              fightteams: FightTeamLightInformations[], fightteamsoptions: FightOptionsInformations[]) {
    super();
    this.fightteams = fightteams;
    this.fightteamsoptions = fightteamsoptions;
    this.fightid = fightid;
    this.fighttype = fighttype;
    this.fightstart = fightstart;
    this.fightspectatorlocked = fightspectatorlocked;
  }
}
