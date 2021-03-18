import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const mainContentStyles = (theme: Theme) =>
  createStyles({
    main: {
      padding: 16,
      transition: "margin-left .3s"
    },
    paper: {
      color: theme.palette.text.secondary,
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
      textAlign: "center"
    },
    root: {
      flexGrow: 1,
      marginTop: 64
    },
    sidenav: {
      backgroundColor: "#444444",
      border: "1px solid " + theme.palette.primary.main,
      height: "100%",
      left: 0,
      overflowX: "hidden",
      paddingBottom: 30,
      paddingTop: 60,
      position: "fixed",
      top: 0,
      transition: "0.3s"
    }
  });

export interface IMainContentProps
  extends WithStyles<typeof mainContentStyles> {
  sidenavStatus: number;
}

export interface IMainContentState {
  selectedAccount: Account | null;
}
