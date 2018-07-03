import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type TopAppBarStyle = "root" | "flex" | "menuButton" | "appBar";

export const topAppBarStyles: StyleRulesCallback<TopAppBarStyle> = theme => ({
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
