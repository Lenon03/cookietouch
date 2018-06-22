import LanguageManager from "@/configurations/language/LanguageManager";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { signout } from "@renderer/FirebaseHelpers";
import AccountsManager from "@renderer/pages/AccountsManager";
import Configuration from "@renderer/pages/Configuration";
import LoginFormDialog from "@renderer/pages/LoginFormDialog";
import firebase from "firebase";
import * as React from "react";

type style = "root" | "flex" | "menuButton" | "appBar";

const styles: StyleRulesCallback<style> = theme => ({
  appBar: {
    background: "linear-gradient(45deg, #1de099, #1dc8cd)",
    left: 0,
    position: "absolute",
    top: 0
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    flexGrow: 1
  }
});

interface IProps {
  clickMenu: () => void;
  user?: firebase.User;
}

interface IState {
  anchorEl: any;
  loginForm: boolean;
  accountsManager: boolean;
  configuration: boolean;
}

type Props = IProps & WithStyles<style>;

class TopAppBar extends React.Component<Props, IState> {
  public state: IState = {
    accountsManager: false,
    anchorEl: null,
    configuration: false,
    loginForm: false
  };

  public render() {
    const { classes, clickMenu, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon onClick={clickMenu} />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              CookieTouch
            </Typography>
            {user ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={event => this.handleMenu(event)}
                  color="inherit"
                >
                  {user && user.photoURL ? (
                    <Avatar src={user.photoURL} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "top"
                  }}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.toggleAccountsManager(true)}>
                    {LanguageManager.trans("accountsManager")}
                  </MenuItem>
                  <MenuItem onClick={() => this.toggleConfiguration(true)}>
                    Configuration
                  </MenuItem>
                  <MenuItem onClick={() => signout()}>
                    {LanguageManager.trans("disconnect")}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                color="inherit"
                onClick={() => this.toggleLoginForm(true)}
              >
                {LanguageManager.trans("connect")}
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LoginFormDialog
          dialogOpen={this.state.loginForm}
          closeDialog={() => {
            this.toggleLoginForm(false);
            this.handleClose();
          }}
        />
        <AccountsManager
          dialogOpen={this.state.accountsManager}
          closeDialog={() => {
            this.toggleAccountsManager(false);
            this.handleClose();
          }}
        />
        <Configuration
          dialogOpen={this.state.configuration}
          closeDialog={() => {
            this.toggleConfiguration(false);
            this.handleClose();
          }}
        />
      </div>
    );
  }

  private handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  private handleClose = () => {
    this.setState({ anchorEl: null });
  };

  private toggleLoginForm = (open: boolean) => {
    this.setState({ loginForm: open });
  };

  private toggleAccountsManager = (open: boolean) => {
    this.setState({ accountsManager: open });
  };

  private toggleConfiguration = (open: boolean) => {
    this.setState({ configuration: open });
  };
}

export default withStyles(styles)<IProps>(TopAppBar);
