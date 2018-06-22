import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type LoginFormDialogStyle = "root" | "formControl";

export const loginFormDialogStyles: StyleRulesCallback<
  LoginFormDialogStyle
> = theme => ({
  formControl: { margin: theme.spacing.unit },
  root: { flexGrow: 1 }
});
