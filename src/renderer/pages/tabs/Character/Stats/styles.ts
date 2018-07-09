import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CharacterStatsTabStyle =
  | "root"
  | "statsLabelSpan"
  | "labelStats"
  | "lineStats"
  | "iconStats"
  | "statsLabelSpanAdd"
  | "card"
  | "labelPointsStats";

export const characterStatsTabStyles: StyleRulesCallback<
  CharacterStatsTabStyle
> = theme => ({
  card: {
    minWidth: 275,
    padding: 20
  },
  iconStats: {
    float: "left",
    marginTop: "6px"
  },
  labelPointsStats: {
    marginLeft: 20,
    marginTop: 10
  },
  labelStats: {
    float: "left",
    marginLeft: 12,
    marginTop: "15px"
  },
  lineStats: {
    alignItems: "center",
    height: 50,
    verticalAlign: "middle"
  },
  root: {
    flexGrow: 1,
    padding: 10
  },
  statsLabelSpan: {
    float: "right",
    marginTop: 16
  },
  statsLabelSpanAdd: {
    float: "right",
    marginTop: 4
  }
});
