import { AccountStates } from "@/account/AccountStates";
import Group from "@/groups/Group";
import Account from "@account";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CookieMain from "@renderer/CookieMain";
import * as React from "react";

type style = "root" | "nested" | "image" | "text";

const styles: StyleRulesCallback<style> = theme => ({
  image: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  root: {
    flexGrow: 1
  },
  text: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
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
    open: false
  };

  public render() {
    const { classes, group } = this.props;

    return (
      <div className={classes.root}>
        <ListItem
          button
          onClick={() => {
            this.handleClick();
            this.changeAccount(group.chief);
          }}
        >
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
            inset
            primary={
              <span className={classes.text}>
                {group.chief.accountConfig.username}
              </span>
            }
          />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {group.members.ToArray().map((m, idx) => (
            <List key={idx} component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => this.changeAccount(m)}
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
                  inset
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

  private changeAccount = (account: Account) => {
    CookieMain.selectedAccount = account;
  };
}

export default withStyles(styles)<IProps>(GroupItem);
