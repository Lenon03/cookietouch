import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CacheManagerStyle = "root" | "paper";

export const cacheManagerStyles: StyleRulesCallback<
  CacheManagerStyle
> = theme => ({
  paper: {
    padding: 16
  },
  root: {
    flexGrow: 1
  }
});
