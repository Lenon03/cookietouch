import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CharacterTabStyle = "root" | "appBar" | "tab";

export const characterTabStyles: StyleRulesCallback<
  CharacterTabStyle
> = theme => ({
  appBar: {
    //
  },
  root: {
    flexGrow: 1
  },
  tab: {
    borderCollapse: "collapse",
    maxWidth: 1000
  }
});
