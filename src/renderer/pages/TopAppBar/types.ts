import { WithStyles } from "@material-ui/core/styles/withStyles";
import { TopAppBarStyle } from "@renderer/pages/TopAppBar/styles";
import firebase from "firebase";

export interface ITopAppBarProps {
  clickMenu: () => void;
  user?: firebase.User;
}

export interface ITopAppBarState {
  anchorEl: any;
  loginForm: boolean;
  accountsManager: boolean;
  configuration: boolean;
}

export type TopAppBarProps = ITopAppBarProps & WithStyles<TopAppBarStyle>;
