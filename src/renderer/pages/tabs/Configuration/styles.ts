import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type ConfigurationTabStyle =
  | "root"
  | "card"
  | "title"
  | "formControl"
  | "table";

export const configurationTabStyles: StyleRulesCallback<
  ConfigurationTabStyle
  > = theme => ({
    card: {
      margin: 20,
      minWidth: 275
    },
    formControl: {
      margin: theme.spacing.unit,
      width: "100%"
    },
    root: {
      flexGrow: 1
    },
    table: {
      maxWidth: 700
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: 14,
      marginBottom: 16
    }
  });
