import Account from "@/account";
import ObjectToSellEntry from "@/extensions/bid/ObjectToSellEntry";
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
  characterConnected: boolean;
  kamasGained: number;
  kamasPaidOnTaxes: number;
  interval: number;
  objects: ObjectToSellEntry[];
  running: boolean;
  script: string;
}

export type BidTabProps = IBidTabProps & WithStyles<BidTabStyle>;
