import { AccountStates } from "@/account/AccountStates";
import Account from "@/account";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CookieMain from "@renderer/CookieMain";
import * as React from "react";

type style = "root" | "image" | "text";

const styles: StyleRulesCallback<style> = theme => ({
  image: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30
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
  account: Account;
}

type Props = IProps & WithStyles<style>;

class AccountItem extends React.Component<Props, {}> {
  public render() {
    const { account, classes } = this.props;

    return (
      <div className={classes.root}>
        <ListItem button onClick={() => this.changeAccount(account)}>
          <ListItemIcon>
            {account.state === AccountStates.NONE ? (
              <Avatar
                src={account.game.character.getSkinUrl("face", 1, 120, 120, 1)}
              />
            ) : (
              <AccountCircle className={classes.image} />
            )}
          </ListItemIcon>
          <ListItemText
            inset
            primary={
              <span className={classes.text}>
                {account.accountConfig.username}
              </span>
            }
          />
        </ListItem>
      </div>
    );
  }

  private changeAccount = (account: Account) => {
    CookieMain.selectedAccount = account;
  };
}

export default withStyles(styles)<IProps>(AccountItem);
