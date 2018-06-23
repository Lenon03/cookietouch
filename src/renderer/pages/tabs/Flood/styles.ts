import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type FloodTabStyle = "root" | "table" | "formControl" | "card" | "title";

export const floodTabStyles: StyleRulesCallback<FloodTabStyle> = theme => ({
  card: {
    minWidth: 275
  },
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
    maxHeight: 500,
    overflowY: "auto",
    padding: 10
  },
  table: {
    minWidth: 700
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    marginBottom: 16
  }
});
