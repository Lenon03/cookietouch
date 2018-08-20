import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { InfosStyle } from "@renderer/pages/Infos/styles";

export interface IInfosProps {
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

export type InfosProps = IInfosProps & WithStyles<InfosStyle>;
