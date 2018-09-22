import LanguageManager from "@/configurations/language/LanguageManager";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { signout } from "@renderer/FirebaseHelpers";
import BottomAppBar from "@renderer/pages/BottomAppBar";
import { IMainProps, IMainState, mainStyles } from "@renderer/pages/Main/types";
import MainContent from "@renderer/pages/MainContent";
import TopAppBar from "@renderer/pages/TopAppBar";
import withRoot from "@renderer/withRoot";
import firebase from "firebase/app";
import * as React from "react";

class Main extends React.Component<IMainProps, IMainState> {
  public state: IMainState = {
    sidenavStatus: 0,
    user: null
  };

  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          this.setState({ user });
        } else {
          signout();
        }
      } else {
        this.setState({ user: null });
      }
    });
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TopAppBar user={this.state.user} clickMenu={this.toggleDrawer} />
        {this.state.user ? (
          <MainContent sidenavStatus={this.state.sidenavStatus} />
        ) : (
          <Paper className={classes.paper}>
            {LanguageManager.trans("mustLogin")}
          </Paper>
        )}
        <BottomAppBar />
      </div>
    );
  }

  private toggleDrawer = () => {
    this.setState(prev => ({
      sidenavStatus: prev.sidenavStatus === 0 ? 250 : 0
    }));
  };
}

export default withRoot(withStyles(mainStyles)(Main));
