import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const accountsManagerStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface IAccountsManagerProps
  extends WithStyles<typeof accountsManagerStyles> {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export interface IAccountsManagerState {
  //
}
