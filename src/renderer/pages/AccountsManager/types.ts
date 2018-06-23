import { WithStyles } from "@material-ui/core/styles/withStyles";
import { AccountsManagerStyle } from "@renderer/pages/AccountsManager/styles";

export interface IAccountsManagerProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export interface IAccountsManagerState {
  //
}

export type AccountsManagerProps = IAccountsManagerProps &
  WithStyles<AccountsManagerStyle>;
