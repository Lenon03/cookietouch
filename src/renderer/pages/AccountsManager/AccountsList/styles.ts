import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type AccountsListStyle = "root" | "icon";

export const accountsListStyles: StyleRulesCallback<
  AccountsListStyle
> = theme => ({
  icon: {
    color: theme.palette.primary.main
  },
  root: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
    margin: theme.spacing.unit,
    maxHeight: 400,
    overflowY: "auto",
    padding: theme.spacing.unit * 2
  }
});
