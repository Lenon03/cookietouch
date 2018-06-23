import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type SidenavStyle = "root";

export const sidenavStyles: StyleRulesCallback<SidenavStyle> = theme => ({
  root: {
    flexGrow: 1
  }
});
