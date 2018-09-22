import { createStyles, Theme, WithStyles } from "@material-ui/core";
import firebase from "firebase/app";

export const mainStyles = (theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
      margin: theme.spacing.unit,
      marginTop: 120,
      padding: theme.spacing.unit * 2,
      textAlign: "center"
    },
    root: {
      flexGrow: 1,
      paddingBottom: 28
    }
  });

export interface IMainProps extends WithStyles<typeof mainStyles> {
  //
}

export interface IMainState {
  sidenavStatus: number;
  user: firebase.User | null;
}
