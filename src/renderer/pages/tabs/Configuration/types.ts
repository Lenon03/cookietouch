import Account from "@/account";
import SpellToBoostEntry from "@/account/configurations/SpellToBoostEntry";
import { BoostableStats } from "@/game/character/BoostableStats";
import Spells from "@/protocol/data/classes/Spells";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { ConfigurationTabStyle } from "@renderer/pages/tabs/Configuration/styles";

export enum SpellLevels {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

export interface IConfigurationTabProps {
  account: Account;
}

export interface IConfigurationTabState {
  acceptAchievements: boolean;
  authorizedTradesFrom: number[];
  autoRegenAccepted: boolean;
  autoMount: boolean;
  breedSpells: Spells[];
  characterConnected: boolean;
  disconnectUponFightsLimit: boolean;
  enableSpeedHack: boolean;
  ignoreNonAuthorizedTrades: boolean;
  spellId: number;
  spellLevel: SpellLevels;
  spells: SpellToBoostEntry[];
  statToBoost: BoostableStats;
  toAddToAuthorized: number;
}

export type ConfigurationTabProps = IConfigurationTabProps &
  WithStyles<ConfigurationTabStyle>;
