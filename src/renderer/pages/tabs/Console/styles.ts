import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type ConsoleTabStyle =
  | "root"
  | "console"
  | "consoleSpan"
  | "formControl"
  | "inputConsoleChat"
  | "status"
  | "cleanConsole";

export const consoleTabStyles: StyleRulesCallback<ConsoleTabStyle> = theme => ({
  cleanConsole: {
    width: "97%"
  },
  console: {
    backgroundColor: "#403f3f",
    height: "400px",
    marginLeft: 20,
    marginTop: 20,
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
    margin: theme.spacing.unit,
    marginLeft: 20,
    width: "100%"
  },
  inputConsoleChat: {
    marginTop: 16
  },
  root: {
    flexGrow: 1
  },
  status: {
    marginTop: 10
  }
});
