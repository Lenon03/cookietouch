import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type AccountMainStyle = "root" | "appBar" | "tab";

export const accountMainStyles: StyleRulesCallback<
  AccountMainStyle
> = theme => ({
  appBar: {
    //
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  tab: {
    width: "100%"
  }
});
