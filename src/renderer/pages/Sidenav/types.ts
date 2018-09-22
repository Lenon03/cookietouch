import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { List } from "linqts";

export const sidenavStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface ISidenavProps extends WithStyles<typeof sidenavStyles> {
  //
}

export interface ISidenavState {
  connectedAccounts: List<Account>;
}
