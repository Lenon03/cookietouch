import Account from "@/account";
import { IPushBulletConfig } from "@/account/configurations/PushBulletConfig";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { PushbulletTabStyle } from "@renderer/pages/tabs/Pushbullet/styles";

export interface IPushbulletTabProps {
  account: Account;
}

export interface IPushbulletTabState extends IPushBulletConfig {
  characterConnected: boolean;
}

export type PushbulletTabProps = IPushbulletTabProps &
  WithStyles<PushbulletTabStyle>;
