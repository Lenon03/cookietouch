import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type StatisticsTabStyle = "root" | "table";

export const statisticsTabStyles: StyleRulesCallback<
  StatisticsTabStyle
> = theme => ({
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
