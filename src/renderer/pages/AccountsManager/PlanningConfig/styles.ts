import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type PlanningConfigStyle =
  | "root"
  | "heading"
  | "formControl"
  | "chips"
  | "chip"
  | "list"
  | "expansionpanel"
  | "regroupall";

export const planningConfigStyles: StyleRulesCallback<
  PlanningConfigStyle
> = theme => ({
  chip: {
    margin: theme.spacing.unit / 4
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  expansionpanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 150
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  list: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  regroupall: {
    display: "flex",
    flexDirection: "column"
  },
  root: {
    flexGrow: 1
  }
});
