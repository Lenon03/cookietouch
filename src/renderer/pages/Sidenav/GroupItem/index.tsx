import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CookieMain from "@renderer/CookieMain";
import { groupItemStyles } from "@renderer/pages/Sidenav/GroupItem/styles";
import {
  GroupItemProps,
  IGroupItemProps,
  IGroupItemState
} from "@renderer/pages/Sidenav/GroupItem/types";
import * as React from "react";

class GroupItem extends React.Component<GroupItemProps, IGroupItemState> {
  public state: IGroupItemState = {
    open: false
  };

  public render() {
    const { classes, group } = this.props;

    return (
      <div className={classes.root}>
        <ListItem button={true} onClick={this.changeAccount(group.chief)}>
          <ListItemIcon>
            {group.chief.state === AccountStates.NONE ? (
              <Avatar
                src={group.chief.game.character.getSkinUrl(
                  "face",
                  1,
                  120,
                  120,
                  1
                )}
              />
            ) : (
              <AccountCircle className={classes.image} />
            )}
          </ListItemIcon>
          <ListItemText
            inset={true}
            primary={
              <span className={classes.text}>
                {group.chief.accountConfig.username}
              </span>
            }
          />
          <div onClick={this.handleClick}>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </ListItem>

        <Collapse in={this.state.open} timeout="auto" unmountOnExit={true}>
          {group.members.ToArray().map((m, idx) => (
            <List key={idx} component="div" disablePadding={true}>
              <ListItem
                button={true}
                className={classes.nested}
                onClick={this.changeAccount(m)}
              >
                <ListItemIcon>
                  {m.state === AccountStates.NONE ? (
                    <Avatar
                      src={m.game.character.getSkinUrl("face", 1, 120, 120, 1)}
                    />
                  ) : (
                    <AccountCircle className={classes.image} />
                  )}
                </ListItemIcon>
                <ListItemText
                  inset={true}
                  primary={
                    <span className={classes.text}>
                      {m.accountConfig.username}
                    </span>
                  }
                />
              </ListItem>
            </List>
          ))}
        </Collapse>
      </div>
    );
  }

  private handleClick = () => {
    this.setState(prev => ({ open: !prev.open }));
  };

  private changeAccount = (account: Account) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    CookieMain.selectedAccount = account;
  };
}

export default withStyles(groupItemStyles)<IGroupItemProps>(GroupItem);
