import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type FightsTabStyle =
  | "root"
  | "appBar"
  | "tab"
  | "card"
  | "title"
  | "formControl"
  | "table"
  | "paper"
  | "modal"
  | "overflow";

export const fightsTabStyles: StyleRulesCallback<FightsTabStyle> = theme => ({
  appBar: {
    //
  },
  card: {
    minWidth: 275
  },
  formControl: {
    margin: theme.spacing.unit
  },
  modal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    position: "absolute",
    width: theme.spacing.unit * 50
  },
  overflow: {
    maxHeight: 400,
    overflowY: "auto"
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  },
  root: {
    flexGrow: 1
  },
  tab: {
    height: 30,
    maxWidth: 1000
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
