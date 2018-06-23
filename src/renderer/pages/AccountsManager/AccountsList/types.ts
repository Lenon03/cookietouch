import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { AccountsListStyle } from "@renderer/pages/AccountsManager/AccountsList/styles";

export interface IAccountsListProps {
  closeDialog: () => void;
}

export interface IAccountsListState {
  accountsList: AccountConfiguration[];
  accountsToConnect: AccountConfiguration[];
}

export type AccountsListProps = IAccountsListProps &
  WithStyles<AccountsListStyle>;
