import Account from "@/account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { SidenavStyle } from "@renderer/pages/Sidenav/styles";
import { List } from "linqts";

export interface ISidenavProps {
  //
}

export interface ISidenavState {
  connectedAccounts: List<Account>;
}

export type SidenavProps = ISidenavProps & WithStyles<SidenavStyle>;
