import Account from "@/account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { AccountItemStyle } from "@renderer/pages/Sidenav/AccountItem/styles";

export interface IAccountItemProps {
  account: Account;
}

export interface IAccountItemState {
  //
}

export type AccountItemProps = IAccountItemProps & WithStyles<AccountItemStyle>;
