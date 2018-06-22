import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type InfosStyle = "root" | "paper" | "icon";

export const infosStyles: StyleRulesCallback<InfosStyle> = theme => ({
  icon: {
    color: theme.palette.primary.main
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  },
  root: {
    flexGrow: 1
  }
});
