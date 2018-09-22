import Account from "@/account";
import SpellToBoostEntry from "@/account/configurations/SpellToBoostEntry";
import { BoostableStats } from "@/game/character/BoostableStats";
import Spells from "@/protocol/data/classes/Spells";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const configurationTabStyles = (theme: Theme) =>
  createStyles({
    card: {
      margin: 20,
      minWidth: 275
    },
    formControl: {
      margin: theme.spacing.unit,
      width: "100%"
    },
    root: {
      flexGrow: 1
    },
    table: {
      maxWidth: 700
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: 14,
      marginBottom: 16
    }
  });

export enum SpellLevels {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

export interface IConfigurationTabProps
  extends WithStyles<typeof configurationTabStyles> {
  account: Account;
}

export interface IConfigurationTabState {
  acceptAchievements: boolean;
  antiAgro: boolean;
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
