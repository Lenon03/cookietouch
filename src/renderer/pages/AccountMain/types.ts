import Account from "@account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { AccountMainStyle } from "./styles";

export interface IAccountMainProps {
  account: Account;
}

export interface IAccountMainState {
  value: number;
}

export type AccountMainProps = IAccountMainProps & WithStyles<AccountMainStyle>;
