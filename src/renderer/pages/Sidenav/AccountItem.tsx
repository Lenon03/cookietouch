import { AccountStates } from "@/account/AccountStates";
import Account from "@account";
import CookieMain from "@renderer/CookieMain";
import AccountCircle from "material-ui-icons/AccountCircle";
import Avatar from "material-ui/Avatar";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import * as React from "react";

type style = "root" | "image" | "text";

const styles: StyleRulesCallback<style> = (theme) => ({
  image: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30,
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
            {account.state === AccountStates.NONE ?
              <Avatar src={account.game.character.getSkinUrl("face", 1, 120, 120, 1)} />
              : <AccountCircle className={classes.image} />}
          </ListItemIcon>
          <ListItemText inset primary={<span className={classes.text}>{account.accountConfig.username}</span>} />
        </ListItem>
      </div>
    );
  }

  private changeAccount = (account: Account) => {
    CookieMain.selectedAccount = account;
  }
}

export default withStyles(styles)<IProps>(AccountItem);
