import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type ConfigurationStyle = "root" | "formControl";

export const configurationStyles: StyleRulesCallback<
  ConfigurationStyle
> = theme => ({
  formControl: { margin: theme.spacing.unit },
  root: { flexGrow: 1 }
});
