import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const accountMainstyles = (theme: Theme) =>
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

export interface IAccountMainProps
  extends WithStyles<typeof accountMainstyles> {
  account: Account;
}

export interface IAccountMainState {
  value: number;
}
