import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const infosStyles = (theme: Theme) =>
  createStyles({
    buttonConnect: {
      width: "100%"
    },
    buttonRemove: {
      width: "100%"
    },
    icon: {
      color: theme.palette.primary.main
    },
    infosLinearProgress: {
      marginBottom: 8,
      marginLeft: 20
    },
    paper: {
      color: theme.palette.text.secondary,
      margin: theme.spacing.unit,
      padding: 10
    },
    root: {
      flexGrow: 1
    }
  });

export interface IInfosProps extends WithStyles<typeof infosStyles> {
  account: Account;
}

export interface IInfosState {
  energyPoints: number;
  energyPointsMax: number;
  experience: number;
  experienceMax: number;
  experiencePercent: number;
  kamas: number;
  lifePoints: number;
  lifePointsMax: number;
  position: string;
  scriptLoaded: boolean;
  scriptName: string;
  status: AccountStates;
  weight: number;
  weightMax: number;
  goultines: number;
  bonuspack: string;
  characterConnected: boolean;
}
