import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type ConsoleTabStyle =
  | "root"
  | "console"
  | "consoleSpan"
  | "formControl";

export const consoleTabStyles: StyleRulesCallback<ConsoleTabStyle> = theme => ({
  console: {
    backgroundColor: "#403f3f",
    height: "400px",
    overflowX: "hidden",
    overflowY: "visible",
    padding: 10,
    width: "100%"
  },
  consoleSpan: {
    display: "block",
    position: "relative"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1
  }
});
