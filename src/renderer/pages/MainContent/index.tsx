import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CookieMain from "@renderer/CookieMain";
import AccountMain from "@renderer/pages/AccountMain";
import Infos from "@renderer/pages/Infos";
import { mainContentStyles } from "@renderer/pages/MainContent/styles";
import {
  IMainContentProps,
  IMainContentState,
  MainContentProps
} from "@renderer/pages/MainContent/types";
import Sidenav from "@renderer/pages/Sidenav";
import * as React from "react";

class MainContent extends React.Component<MainContentProps, IMainContentState> {
  public state: IMainContentState = {
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

export default withStyles(mainContentStyles)<IMainContentProps>(MainContent);
