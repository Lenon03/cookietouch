import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type GroupItemStyle = "root" | "nested" | "image" | "text";

export const groupItemStyles: StyleRulesCallback<GroupItemStyle> = theme => ({
  image: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  root: {
    flexGrow: 1
  },
  text: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
});
