import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type InventoryTabStyle =
  | "root"
  | "appBar"
  | "tab"
  | "table"
  | "overflow"
  | "tablecell";

export const inventoryTabStyles: StyleRulesCallback<
  InventoryTabStyle
> = theme => ({
  appBar: {
    //
  },
  overflow: {
    maxHeight: "40vh",
    overflowY: "auto"
  },
  root: {
    flexGrow: 1
  },
  tab: {
    maxWidth: 1000,
    minWidth: 30
  },
  table: {
    minWidth: 700,
    textAlign: "center",
    verticalAlign: "middle"
  },
  tablecell: {
    textAlign: "center",
    verticalAlign: "middle"
  }
});
