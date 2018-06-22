import AppBar from "@material-ui/core/AppBar";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as firebase from "firebase";
import * as React from "react";

type style = "root" | "appbar" | "toolbar";

const styles: StyleRulesCallback<style> = theme => ({
  appbar: {
    background: "linear-gradient(45deg, #1dc8cd, #1de099)"
  },
  root: {
    bottom: 0,
    flexGrow: 1,
    position: "fixed",
    width: "100%"
  },
  toolbar: {
    minHeight: 28
  }
});

interface IState {
  totalUsers: number;
  usersConnected: number;
}

class BottomAppBar extends React.Component<WithStyles<style>, IState> {
  public state: IState = {
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

export default withStyles(styles)<{}>(BottomAppBar);
