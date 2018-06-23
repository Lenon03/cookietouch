import Account from "@/account";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { InventoryTabStyle } from "@renderer/pages/tabs/Inventory/styles";

export enum DeleteDropUseChoice {
  Delete,
  Drop,
  Use
}

export interface IInventoryTabProps {
  account: Account;
}

export interface IInventoryTabState {
  value: number;
  deleteDropUseChoice: DeleteDropUseChoice;
  consumables: ObjectEntry[];
  equipments: ObjectEntry[];
  quantity: number;
  questObjects: ObjectEntry[];
  object: ObjectEntry;
  resources: ObjectEntry[];
  modal: boolean;
}

export type InventoryTabProps = IInventoryTabProps &
  WithStyles<InventoryTabStyle>;
