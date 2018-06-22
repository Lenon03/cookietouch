import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type MainStyle = "root" | "paper";

export const mainStyles: StyleRulesCallback<MainStyle> = theme => ({
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
