import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type BottomAppBarStyle = "root" | "appbar" | "toolbar";

export const bottomAppBarStyles: StyleRulesCallback<
  BottomAppBarStyle
> = theme => ({
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
