import { AccountStates } from "@/account/AccountStates";
import Group from "@/groups/Group";
import Account from "@account";
import CookieMain from "@renderer/CookieMain";
import AccountCircle from "material-ui-icons/AccountCircle";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import Avatar from "material-ui/Avatar";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import Collapse from "material-ui/transitions/Collapse";
import * as React from "react";

type style = "root" | "nested" | "image" | "text";

const styles: StyleRulesCallback<style> = (theme) => ({
  image: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    flexGrow: 1,
  },
  text: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
});

interface IProps {
  group: Group;
}

interface IState {
  open: boolean;
}

type Props = IProps & WithStyles<style>;

class GroupItem extends React.Component<Props, IState> {

  public state: IState = {
    open: false,
  };

  public render() {
    const { classes, group } = this.props;

    return (
      <div className={classes.root}>
        <ListItem button onClick={() => {
          this.handleClick();
          this.changeAccount(group.chief);
        }}>
          <ListItemIcon>
          {group.chief.state === AccountStates.NONE ?
                    <Avatar src={group.chief.game.character.getSkinUrl("face", 1, 120, 120, 1)} />
                  : <AccountCircle className={classes.image} />}
          </ListItemIcon>
          <ListItemText inset primary={<span className={classes.text}>{group.chief.accountConfig.username}</span>} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {group.members.ToArray().map((m, idx) => (
            <List key={idx} component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => this.changeAccount(m)}>
                <ListItemIcon>
                  {m.state === AccountStates.NONE ?
                    <Avatar src={m.game.character.getSkinUrl("face", 1, 120, 120, 1)} />
                  : <AccountCircle className={classes.image} />}
                </ListItemIcon>
                <ListItemText inset primary={<span className={classes.text}>{m.accountConfig.username}</span>} />
              </ListItem>
            </List>
          ))}
        </Collapse>
      </div>
    );
  }

  private handleClick = () => {
    this.setState((prev) => ({ open: !prev.open }));
  }

  private changeAccount = (account: Account) => {
    CookieMain.selectedAccount = account;
  }
}

export default withStyles(styles)<IProps>(GroupItem);
