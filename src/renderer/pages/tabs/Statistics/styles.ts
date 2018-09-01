import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type StatisticsTabStyle = "root" | "table" | "heading";

export const statisticsTabStyles: StyleRulesCallback<
  StatisticsTabStyle
> = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  root: {
    flexGrow: 1,
    padding: 10
  },
  table: {
    maxHeight: 300,
    minWidth: 300,
    overflowY: "auto"
  }
});
