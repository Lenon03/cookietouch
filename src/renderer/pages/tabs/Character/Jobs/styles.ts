import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CharacterJobsTabStyle = "root" | "table";

export const characterJobsTabStyles: StyleRulesCallback<
  CharacterJobsTabStyle
> = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: 400,
    overflowY: "auto",
    padding: 10
  },
  table: {
    minWidth: 700
  }
});
