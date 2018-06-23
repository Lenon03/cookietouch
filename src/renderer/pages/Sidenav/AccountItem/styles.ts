import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type AccountItemStyle = "root" | "image" | "text";

export const accountItemStyles: StyleRulesCallback<
  AccountItemStyle
> = theme => ({
  image: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30
  },
  root: {
    flexGrow: 1
  },
  text: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
});
