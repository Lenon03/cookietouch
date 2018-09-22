import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const accountsListStyles = (theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.main
    },
    root: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
      margin: theme.spacing.unit,
      maxHeight: 400,
      overflowY: "auto",
      padding: theme.spacing.unit * 2
    }
  });

export interface IAccountsListProps
  extends WithStyles<typeof accountsListStyles> {
  closeDialog: () => void;
}

export interface IAccountsListState {
  accountsList: AccountConfiguration[];
  accountsToConnect: AccountConfiguration[];
}
