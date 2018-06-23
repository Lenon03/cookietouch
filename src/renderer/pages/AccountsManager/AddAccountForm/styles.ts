import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type AddAccountFormStyle = "root" | "formControl";

export const addAccountFormStyles: StyleRulesCallback<
  AddAccountFormStyle
> = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  }
});
