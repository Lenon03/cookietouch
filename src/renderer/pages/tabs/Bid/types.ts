import Account from "@/account";
import ObjectToSellEntry from "@/extensions/bid/ObjectToSellEntry";
import Items from "@/protocol/data/classes/Items";
import ObjectItemToSellInBid from "@/protocol/network/types/ObjectItemToSellInBid";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { BidTabStyle } from "@renderer/pages/tabs/Bid/styles";

export interface IAddObjectForm {
  gid: number;
  lot: number;
  quantity: number;
  minPrice: number;
  basePrice: number;
}

export interface IBidTabProps {
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
  selectedItem: Items;
}

export type BidTabProps = IBidTabProps & WithStyles<BidTabStyle>;
