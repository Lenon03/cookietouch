import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type InfosStyle = "root" | "paper" | "icon" | "infosLinearProgress" | "buttonRemove" | "buttonConnect";

export const infosStyles: StyleRulesCallback<InfosStyle> = theme => ({
  buttonConnect: {
    width: "100%"
  },
  buttonRemove: {
    width: "100%"
  },
  icon: {
    color: theme.palette.primary.main
  },
  infosLinearProgress: {
    marginBottom: 8,
    marginLeft: 20
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    padding: 10
  },
  root: {
    flexGrow: 1
  }
});
