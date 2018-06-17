import FightOptionsInformations from "./FightOptionsInformations";
import FightTeamLightInformations from "./FightTeamLightInformations";
import Type from "./Type";

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
