import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import { existsAsync, readFileAsync } from "@/utils/fsAsync";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CookieMain from "@renderer/CookieMain";
import { accountsListStyles } from "@renderer/pages/AccountsManager/AccountsList/styles";
import {
  AccountsListProps,
  IAccountsListProps,
  IAccountsListState
} from "@renderer/pages/AccountsManager/AccountsList/types";
import { remote } from "electron";
import { List as LinqList } from "linqts";
import * as React from "react";
class AccountsList extends React.Component<
  AccountsListProps,
  IAccountsListState
> {
  public state: IAccountsListState = {
    accountsList: GlobalConfiguration.accountsList,
    accountsToConnect: []
  };

  public componentDidMount() {
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated);
  }

  public componentWillUnmount() {
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated);
  }

  public render() {
    const { classes } = this.props;
    const { accountsList } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography variant="title" align="center">
          {LanguageManager.trans("accountList")}
        </Typography>
        <List>
          {accountsList.map((value, idx) => (
            <ListItem
              onDoubleClick={this.connectAccount(value)}
              key={idx}
              dense={true}
              button={true}
              onClick={this.handleToggle(value)}
            >
              <Checkbox
                checked={this.state.accountsToConnect.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple={true}
              />
              <ListItemText primary={value.username} />
              {this.state.accountsToConnect.indexOf(value) !== -1 &&
              this.state.accountsToConnect.length > 1 &&
              this.state.accountsToConnect.length <= 8 ? (
                <ListItemSecondaryAction>
                  <IconButton onClick={this.connectGroup(value)}>
                    <FontAwesomeIcon
                      className={classes.icon}
                      size="lg"
                      icon="chess-queen"
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton onClick={this.removeAccount(value)}>
                    <FontAwesomeIcon
                      className={classes.icon}
                      size="lg"
                      icon="trash"
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
        <Button
          disabled={this.state.accountsToConnect.length < 2}
          style={{ float: "right" }}
          onClick={this.connectSelectedAccounts}
          variant="raised"
          color="primary"
        >
          {LanguageManager.trans("connect")}
        </Button>
        <Button
          style={{ float: "right" }}
          onClick={this.importAccount}
          variant="raised"
          color="primary"
        >
          {LanguageManager.trans("importTxt")}
        </Button>
      </Paper>
    );
  }

  private handleToggle = value => () => {
    const { accountsToConnect } = this.state;
    const currentIndex = accountsToConnect.indexOf(value);
    const newChecked = [...accountsToConnect];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ accountsToConnect: newChecked });
  };

  private entitiesUpdated = () => {
    this.setState({
      accountsList: GlobalConfiguration.accountsList,
      accountsToConnect: []
    });
  };

  private importAccount = () => {
    remote.dialog.showOpenDialog(
      {
        filters: [{ name: "textfile", extensions: ["txt"] }],
        properties: ["openFile"]
      },
      async filepaths => {
        const filePath = filepaths[0];
        if (await existsAsync(filePath)) {
          const file = await readFileAsync(filePath);
          const arry = file.toString().split("\n");
          for (const entry of arry) {
            GlobalConfiguration.addAccountAndSave(
              entry.split(":")[0],
              entry.split(":")[1],
              -1,
              ""
            );
          }
          CookieMain.refreshEntities();
        }
      }
    );
  };

  private connectGroup = (chief: AccountConfiguration) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const members = this.state.accountsToConnect.filter(
      a => a.username !== chief.username
    );
    CookieMain.connectGroup(chief, new LinqList(members));
    this.setState({ accountsToConnect: [] });
    this.props.closeDialog();
  };

  private connectAccount = (account: AccountConfiguration) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    CookieMain.connectAccounts(new LinqList([account]));
    this.setState({ accountsToConnect: [] });
    this.props.closeDialog();
  };

  private connectSelectedAccounts = () => {
    CookieMain.connectAccounts(new LinqList(this.state.accountsToConnect));
    this.setState({ accountsToConnect: [] });
    this.props.closeDialog();
  };

  private removeAccount = (accountConfig: AccountConfiguration) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (!confirm(LanguageManager.trans("delete"))) {
      return;
    }
    GlobalConfiguration.removeAccount(accountConfig);
    GlobalConfiguration.save();
    this.setState({ accountsList: GlobalConfiguration.accountsList });
  };
}

export default withStyles(accountsListStyles)<IAccountsListProps>(AccountsList);
