import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const characterTabStyles = (theme: Theme) =>
  createStyles({
    appBar: {
      //
    },
    root: {
      flexGrow: 1
    },
    tab: {
      borderCollapse: "collapse",
      maxWidth: 1000
    }
  });

export interface ICharacterTabProps
  extends WithStyles<typeof characterTabStyles> {
  account: Account;
}

export interface ICharacterTabState {
  value: number;
}
