import LanguageManager from "@/configurations/language/LanguageManager";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { signout } from "@renderer/FirebaseHelpers";
import AccountsManager from "@renderer/pages/AccountsManager";
import Configuration from "@renderer/pages/Configuration";
import LoginFormDialog from "@renderer/pages/LoginFormDialog";
import { topAppBarStyles } from "@renderer/pages/TopAppBar/styles";
import {
  ITopAppBarProps,
  ITopAppBarState,
  TopAppBarProps
} from "@renderer/pages/TopAppBar/types";
import * as React from "react";

class TopAppBar extends React.Component<TopAppBarProps, ITopAppBarState> {
  public state: ITopAppBarState = {
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
                  onClick={this.handleMenu}
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
                  <MenuItem onClick={this.toggleAccountsManager(true)}>
                    {LanguageManager.trans("accountsManager")}
                  </MenuItem>
                  <MenuItem onClick={this.toggleConfiguration(true)}>
                    Configuration
                  </MenuItem>
                  <MenuItem onClick={this.signout}>
                    {LanguageManager.trans("disconnect")}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" onClick={this.toggleLoginForm(true)}>
                {LanguageManager.trans("connect")}
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LoginFormDialog
          dialogOpen={this.state.loginForm}
          closeDialog={this.closeDialogLogin}
        />
        <AccountsManager
          dialogOpen={this.state.accountsManager}
          closeDialog={this.closeDialogAccountsManager}
        />
        <Configuration
          dialogOpen={this.state.configuration}
          closeDialog={this.closeDialogConfiguration}
        />
      </div>
    );
  }

  private signout = () => {
    signout();
  };

  private closeDialogLogin = () => {
    this.toggleLoginForm(false)();
    this.handleClose();
  };

  private closeDialogAccountsManager = () => {
    this.toggleAccountsManager(false)();
    this.handleClose();
  };

  private closeDialogConfiguration = () => {
    this.toggleConfiguration(false)();
    this.handleClose();
  };

  private handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: null });
  };

  private toggleLoginForm = (open: boolean) => () => {
    this.setState({ loginForm: open });
  };

  private toggleAccountsManager = (open: boolean) => () => {
    this.setState({ accountsManager: open });
  };

  private toggleConfiguration = (open: boolean) => () => {
    this.setState({ configuration: open });
  };
}

export default withStyles(topAppBarStyles)<ITopAppBarProps>(TopAppBar);
