import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CharacterStatsTabStyle = "root" | "statsLabelSpan";

export const characterStatsTabStyles: StyleRulesCallback<
  CharacterStatsTabStyle
> = theme => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  statsLabelSpan: {
    float: "right"
  }
});
