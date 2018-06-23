import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CharacterSpellsTabStyle = "root" | "table";

export const characterSpellsTabStyles: StyleRulesCallback<
  CharacterSpellsTabStyle
> = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: 400,
    overflowY: "auto",
    padding: 10
  },
  table: {
    minWidth: 700
  }
});
