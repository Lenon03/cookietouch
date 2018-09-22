import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const planningConfigStyles = (theme: Theme) =>
  createStyles({
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

export interface IPlanningConfigProps
  extends WithStyles<typeof planningConfigStyles> {
  //
}

export interface IPlanningConfigState {
  accountsList: AccountConfiguration[];
  active: boolean;
  planning: boolean[];
  selectedAccounts: AccountConfiguration[];
}
