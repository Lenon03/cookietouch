import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type BidTabStyle = "root" | "table" | "card" | "title" | "formControl";

export const bidTabStyles: StyleRulesCallback<BidTabStyle> = theme => ({
  card: {
    minWidth: 275
  },
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    maxHeight: 500,
    overflowY: "auto",
    padding: 10
  },
  table: {
    maxWidth: 400,
    minWidth: 200
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    marginBottom: 16
  }
});
