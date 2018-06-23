import ListRender from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";
import CookieMain from "@renderer/CookieMain";
import AccountItem from "@renderer/pages/Sidenav/AccountItem";
import GroupItem from "@renderer/pages/Sidenav/GroupItem";
import { sidenavStyles } from "@renderer/pages/Sidenav/styles";
import {
  ISidenavProps,
  ISidenavState,
  SidenavProps
} from "@renderer/pages/Sidenav/types";
import * as React from "react";

class Sidenav extends React.Component<SidenavProps, ISidenavState> {
  public state: ISidenavState = {
    connectedAccounts: CookieMain.connectedAccounts
  };

  public componentDidMount() {
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated);
  }

  public componentWillUnmount() {
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated);
  }

  public render() {
    const { classes } = this.props;
    const { connectedAccounts } = this.state;

    return (
      <div className={classes.root}>
        <ListRender component="nav">
          {connectedAccounts.ToArray().map((a, idx) => {
            if (a.hasGroup) {
              return <GroupItem key={idx} group={a.group} />;
            } else {
              return <AccountItem key={idx} account={a} />;
            }
          })}
        </ListRender>
      </div>
    );
  }

  private entitiesUpdated = () => {
    this.setState({ connectedAccounts: CookieMain.connectedAccounts });
  };
}

export default withStyles(sidenavStyles)<ISidenavProps>(Sidenav);
