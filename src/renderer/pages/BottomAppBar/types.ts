import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const bottomAppBarStyles = (theme: Theme) =>
  createStyles({
    appbar: {
      background: theme.palette.primary.main
    },
    root: {
      bottom: 0,
      flexGrow: 1,
      position: "fixed",
      width: "100%"
    },
    toolbar: {
      minHeight: 28
    }
  });

export interface IBottomAppBarProps
  extends WithStyles<typeof bottomAppBarStyles> {
  //
}

export interface IBottomAppBarState {
  totalUsers: number;
  usersConnected: number;
}
