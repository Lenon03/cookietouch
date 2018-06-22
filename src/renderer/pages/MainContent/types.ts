import Account from "@/account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { MainContentStyle } from "@renderer/pages/MainContent/styles";

export interface IMainContentProps {
  sidenavStatus: number;
}

export interface IMainContentState {
  selectedAccount: Account;
}

export type MainContentProps = IMainContentProps & WithStyles<MainContentStyle>;
