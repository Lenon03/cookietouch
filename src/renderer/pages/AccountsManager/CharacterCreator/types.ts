import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const characterCreatorStyles = (theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing.unit / 4
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing.unit
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    icon: {
      color: theme.palette.primary.main,
      // color: "#015357",
      marginRight: 8
    },
    root: {
      flexGrow: 1
    }
  });

export interface ICharacterCreatorProps
  extends WithStyles<typeof characterCreatorStyles> {
  //
}

export interface ICharacterCreatorState {
  breed: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  create: boolean;
  tutorial: boolean;
  head: number;
  name: string;
  server: number;
  servers: Map<number, string>;
  sex: number;
  accountsList: AccountConfiguration[];
  selectedAccounts: AccountConfiguration[];
}
