import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import { faChessQueen, faTrash } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CookieMain from "@renderer/CookieMain";
import { List as LinqList } from "linqts";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import Input, { InputLabel } from "material-ui/Input";
import List, { ListItem, ListItemSecondaryAction, ListItemText } from "material-ui/List";
import Paper from "material-ui/Paper";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import * as React from "react";

type style = "root" | "icon";

const styles: StyleRulesCallback<style> = (theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
  root: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
    margin: theme.spacing.unit,
    maxHeight: 400,
    overflowY: "auto",
    padding: theme.spacing.unit * 2,
  },
});

interface IProps {
  closeDialog: () => void;
}

type Props = IProps & WithStyles<style>;

interface IState {
  accountsList: AccountConfiguration[];
  accountsToConnect: AccountConfiguration[];
}

class AccountsList extends React.Component<Props, IState> {

  public state: IState = {
    accountsList: GlobalConfiguration.accountsList,
    accountsToConnect: [],
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
        <List>
          {accountsList.map((value, idx) => (
            <ListItem onDoubleClick={() => this.connectAccount(value)}
              key={idx}
              dense
              button
              onClick={this.handleToggle(value)}
            >
              <Checkbox
                checked={this.state.accountsToConnect.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.username} />
              {this.state.accountsToConnect.indexOf(value) !== -1
                && this.state.accountsToConnect.length > 1
                && this.state.accountsToConnect.length <= 8 ? (
                  <ListItemSecondaryAction>
                    <IconButton>
                      <FontAwesomeIcon className={classes.icon} size="lg" icon={faChessQueen} onClick={() => this.connectGroup(value)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                ) : (
                  <ListItemSecondaryAction>
                    <IconButton>
                      <FontAwesomeIcon className={classes.icon} size="lg" icon={faTrash} onClick={() => {
                        if (confirm(LanguageManager.trans("delete"))) {
                          this.removeAccount(value);
                        }
                      }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
            </ListItem>
          ))}
        </List>
        <Button
          disabled={this.state.accountsToConnect.length < 2}
          style={{ float: "right" }} onClick={() => this.connectSelectedAccounts()}
          variant="raised"
          color="primary"
        >
          {LanguageManager.trans("connect")}
        </Button>
      </Paper>
    );
  }

  private handleToggle = (value) => () => {
    const { accountsToConnect } = this.state;
    const currentIndex = accountsToConnect.indexOf(value);
    const newChecked = [...accountsToConnect];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ accountsToConnect: newChecked });
  }

  private entitiesUpdated = () => {
    this.setState({
      accountsList: GlobalConfiguration.accountsList,
      accountsToConnect: [],
    });
  }

  private connectGroup = (chief: AccountConfiguration) => {
    const members = this.state.accountsToConnect.filter((a) => a.username !== chief.username);
    CookieMain.connectGroup(chief, new LinqList(members));
    this.setState({ accountsToConnect: [] });
    this.props.closeDialog();
  }

  private connectAccount = (account: AccountConfiguration) => {
    CookieMain.connectAccounts(new LinqList([account]));
    this.setState({ accountsToConnect: [] });
    this.props.closeDialog();
  }

  private connectSelectedAccounts = () => {
    CookieMain.connectAccounts(new LinqList(this.state.accountsToConnect));
    this.setState({ accountsToConnect: [] });
    this.props.closeDialog();
  }

  private removeAccount(accountConfig: AccountConfiguration) {
    GlobalConfiguration.removeAccount(accountConfig);
    GlobalConfiguration.save();
    this.setState({ accountsList: GlobalConfiguration.accountsList });
  }
}

export default withStyles(styles)<IProps>(AccountsList);
