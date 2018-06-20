import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import Paper from "@material-ui/core/Paper";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import CookieMain from "@renderer/CookieMain";
import * as React from "react";
import AccountMain from "./AccountMain";
import Infos from "./Infos";
import Sidenav from "./Sidenav";

type style = "root" | "sidenav" | "main" | "paper";

const styles: StyleRulesCallback<style> = theme => ({
  main: {
    padding: 16,
    transition: "margin-left .3s"
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    textAlign: "center"
  },
  root: {
    flexGrow: 1,
    marginTop: 64
  },
  sidenav: {
    backgroundColor: "#FFF",
    border: "1px solid " + theme.palette.primary.main,
    height: "100%",
    left: 0,
    overflowX: "hidden",
    paddingBottom: 30,
    paddingTop: 60,
    position: "fixed",
    top: 0,
    transition: "0.3s"
  }
});

interface IProps {
  sidenavStatus: number;
}

interface IState {
  selectedAccount: Account;
}

type Props = IProps & WithStyles<style>;

class MainContent extends React.Component<Props, IState> {
  public state: IState = {
    selectedAccount: CookieMain.selectedAccount
  };

  public componentDidMount() {
    CookieMain.SelectedAccountChanged.on(this.selectedAccountChanged);
  }

  public componentWillUnmount() {
    CookieMain.SelectedAccountChanged.off(this.selectedAccountChanged);
  }

  public render() {
    const { classes } = this.props;
    const { selectedAccount } = this.state;
    return (
      <div className={classes.root}>
        <div
          style={{ width: this.props.sidenavStatus }}
          className={classes.sidenav}
        >
          <Sidenav />
        </div>
        <div
          style={{ marginLeft: this.props.sidenavStatus }}
          className={classes.main}
        >
          {selectedAccount ? (
            <div>
              {CookieMain.connectedAccounts.ToArray().map((account, index) => {
                if (account.hasGroup && account.isGroupChief) {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          display:
                            selectedAccount.accountConfig.character ===
                              account.accountConfig.character &&
                            selectedAccount.accountConfig.username ===
                              account.accountConfig.username
                              ? "block"
                              : "none"
                        }}
                      >
                        <Infos account={account} />
                        <AccountMain account={account} />
                      </div>
                      {account.group.members.ToArray().map((member, idx) => {
                        return (
                          <div
                            key={idx}
                            style={{
                              display:
                                selectedAccount.accountConfig.character ===
                                  member.accountConfig.character &&
                                selectedAccount.accountConfig.username ===
                                  member.accountConfig.username
                                  ? "block"
                                  : "none"
                            }}
                          >
                            <Infos account={member} />
                            <AccountMain account={member} />
                          </div>
                        );
                      })}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      style={{
                        display:
                          selectedAccount.accountConfig.character ===
                            account.accountConfig.character &&
                          selectedAccount.accountConfig.username ===
                            account.accountConfig.username
                            ? "block"
                            : "none"
                      }}
                    >
                      <Infos account={account} />
                      <AccountMain account={account} />
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <Paper className={classes.paper}>
              {LanguageManager.trans("mustConnect")}
            </Paper>
          )}
        </div>
      </div>
    );
  }

  private selectedAccountChanged = (account: Account) => {
    this.setState({ selectedAccount: account });
  };
}

export default withStyles(styles)<IProps>(MainContent);
