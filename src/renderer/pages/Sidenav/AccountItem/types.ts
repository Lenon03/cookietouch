import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const accountItemStyles = (theme: Theme) =>
  createStyles({
    image: {
      color: theme.palette.primary.main,
      height: 30,
      width: 30
    },
    root: {
      flexGrow: 1
    },
    text: {
      color: theme.palette.primary.main,
      fontWeight: "bold"
    }
  });

export interface IAccountItemProps
  extends WithStyles<typeof accountItemStyles> {
  account: Account;
}

export interface IAccountItemState {
  //
}
