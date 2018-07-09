import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type BidTabStyle =
  | "card"
  | "root"
  | "table"
  | "title"
  | "formControl"
  | "leftSide"
  | "rightSide"
  | "syncSell"
  | "leftSideButtom"
  | "leftSideButtomAdd"
  | "container"
  | "paper"
  | "inputRoot"
  | "chip";

export const bidTabStyles: StyleRulesCallback<BidTabStyle> = theme => ({
  card: {
    minWidth: 275
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  leftSide: {
    marginLeft: "4%",
    marginTop: 25
  },
  leftSideButtom: {
    marginLeft: "1%",
    width: "48%"
  },
  leftSideButtomAdd: {
    margin: "1%",
    width: "100%"
  },
  paper: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: "absolute",
    right: 0,
    zIndex: 1
  },
  rightSide: {
    marginLeft: "4%",
    marginTop: 25
  },
  root: {
    flexGrow: 1,
    maxHeight: 600,
    overflowY: "auto"
  },
  syncSell: {
    margin: 10
  },
  table: {
    width: "100%"
    // maxWidth: 400,
    // minWidth: 200,
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    width: "100%"
  }
});
