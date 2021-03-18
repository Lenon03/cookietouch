import Account from "@/account";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const inventoryTabStyles = (theme: Theme) =>
  createStyles({
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

export enum DeleteDropUseChoice {
  Delete,
  Drop,
  Use
}

export interface IInventoryTabProps
  extends WithStyles<typeof inventoryTabStyles> {
  account: Account;
}

export interface IInventoryTabState {
  value: number;
  deleteDropUseChoice: DeleteDropUseChoice;
  consumables: ObjectEntry[];
  equipments: ObjectEntry[];
  quantity: number;
  questObjects: ObjectEntry[];
  object: ObjectEntry | null;
  resources: ObjectEntry[];
  modal: boolean;
}
