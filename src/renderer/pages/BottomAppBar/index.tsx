import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import * as React from "react";
import { bottomAppBarStyles } from "@renderer/pages/BottomAppBar/styles";
import {
  BottomAppBarProps,
  IBottomAppBarProps,
  IBottomAppBarState
} from "@renderer/pages/BottomAppBar/types";

class BottomAppBar extends React.Component<
  BottomAppBarProps,
  IBottomAppBarState
> {
  public state: IBottomAppBarState = {
    totalUsers: 0,
    usersConnected: 0
  };

  public componentDidMount() {
    const listRef = firebase.database().ref("status");
    listRef.on("value", snap => {
      let num = 0;
      snap.forEach(x => {
        if (x.val().state === "online") {
          num++;
        }
        return false;
      });
      this.setState({
        totalUsers: snap.numChildren(),
        usersConnected: num
      });
    });
  }

  public render() {
    const { classes } = this.props;
    const { totalUsers, usersConnected } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="sticky">
          <Toolbar className={classes.toolbar}>
            <Typography variant="subheading" color="inherit">
              {usersConnected} / {totalUsers} users connected.
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(bottomAppBarStyles)<IBottomAppBarProps>(BottomAppBar);
