import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type PushbulletTabStyle = "root" | "card" | "title";

export const pushbulletTabStyles: StyleRulesCallback<
  PushbulletTabStyle
> = theme => ({
  card: {
    margin: 20,
    minWidth: 275
  },
  root: {
    flexGrow: 1
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    marginBottom: 16
  }
});
