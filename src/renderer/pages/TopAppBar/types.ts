import { createStyles, Theme, WithStyles } from "@material-ui/core";
import firebase from "firebase/app";

export const topAppBarStyles = (theme: Theme) =>
  createStyles({
    appBar: {
      background: theme.palette.primary.main,
      left: 0,
      position: "absolute",
      top: 0
    },
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    root: {
      flexGrow: 1
    }
  });

export interface ITopAppBarProps extends WithStyles<typeof topAppBarStyles> {
  clickMenu: () => void;
  user: firebase.User | null;
}

export interface ITopAppBarState {
  anchorEl: EventTarget & HTMLElement | null;
  loginForm: boolean;
  accountsManager: boolean;
  configuration: boolean;
}
