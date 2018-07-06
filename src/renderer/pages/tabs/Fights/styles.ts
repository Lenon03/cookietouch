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
  | "overflow"
  | "selectBlockSpectator";

export const fightsTabStyles: StyleRulesCallback<FightsTabStyle> = theme => ({
  appBar: {
    //
  },
  card: {
    margin: 20,
    minWidth: 275
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  overflow: {
    maxHeight: 1200,
    overflowY: "auto"
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    minHeight: 800,
    padding: theme.spacing.unit * 2
  },
  root: {
    flexGrow: 1
  },
  selectBlockSpectator: {
    marginTop: 50,
  },
  tab: {
    height: 30,
    maxWidth: 1000
  },
  table: {
    heigth: "100%",
    minWidth: 700
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    marginBottom: 16
  }
});
