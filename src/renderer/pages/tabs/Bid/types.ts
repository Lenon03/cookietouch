import Account from "@/account";
import ObjectToSellEntry from "@/extensions/bid/ObjectToSellEntry";
import Items from "@/protocol/data/classes/Items";
import ObjectItemToSellInBid from "@/protocol/network/types/ObjectItemToSellInBid";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const bidTabStyles = (theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    container: {
      flexGrow: 1,
      position: "relative"
    },
    formControl: {
      margin: theme.spacing.unit
    },
    inputRoot: {
      flexWrap: "wrap"
    },
    leftSide: {
      marginLeft: "4%",
      marginTop: 25
    },
    leftSideButtom: {
      marginLeft: "1%",
      width: "48%"
    },
    leftSideButtomAdd: {
      margin: "1%",
      width: "100%"
    },
    paper: {
      left: 0,
      marginTop: theme.spacing.unit,
      position: "absolute",
      right: 0,
      zIndex: 1
    },
    rightSide: {
      marginLeft: "4%",
      marginTop: 25
    },
    root: {
      flexGrow: 1,
      maxHeight: 600,
      overflowY: "auto"
    },
    syncSell: {
      margin: 10
    },
    table: {
      width: "100%"
      // maxWidth: 400,
      // minWidth: 200,
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      width: "100%"
    }
  });

export interface IAddObjectForm {
  gid: number;
  lot: number;
  quantity: number;
  minPrice: number;
  basePrice: number;
}

export interface IBidTabProps extends WithStyles<typeof bidTabStyles> {
  account: Account;
}

export interface IBidTabState {
  addObjectForm: IAddObjectForm;
  allItems: Items[];
  characterConnected: boolean;
  kamasGained: number;
  kamasPaidOnTaxes: number;
  interval: number;
  objects: ObjectToSellEntry[];
  objectsInSale: ObjectItemToSellInBid[];
  objectsInSaleNames: string[];
  running: boolean;
  script: string;
  selectedItem: Items | null;
}
