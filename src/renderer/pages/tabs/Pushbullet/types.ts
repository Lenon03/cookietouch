import Account from "@/account";
import { IPushBulletConfig } from "@/account/configurations/PushBulletConfig";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const pushbulletTabStyles = (theme: Theme) =>
  createStyles({
    card: {
      margin: 20,
      minWidth: 275
    },
    root: {
      flexGrow: 1
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: 14,
      marginBottom: 16
    }
  });

export interface IPushbulletTabProps
  extends WithStyles<typeof pushbulletTabStyles> {
  account: Account;
}

export interface IPushbulletTabState extends IPushBulletConfig {
  characterConnected: boolean;
}
