import { WithStyles } from "@material-ui/core/styles/withStyles";
import { MainStyle } from "@renderer/pages/Main/styles";
import firebase from "firebase/app";

export interface IMainProps {
  //
}

export interface IMainState {
  sidenavStatus: number;
  user: firebase.User;
}

export type MainProps = IMainProps & WithStyles<MainStyle>;
