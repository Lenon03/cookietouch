import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      //
    },
    root: {
      flexGrow: 1,
      margin: theme.spacing.unit
    },
    tab: {
      //
    },
    tabs: {
      //
    }
  });

export interface IAccountMainProps extends WithStyles<typeof styles> {
  account: Account;
}

export interface IAccountMainState {
  value: number;
}
