import { UpdatesChannel } from "@/configurations/GlobalConfiguration";
import { Languages } from "@/configurations/language/Languages";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const configurationStyles = (theme: Theme) =>
  createStyles({
    formControl: { margin: theme.spacing.unit },
    root: { flexGrow: 1 }
  });

export interface IConfigurationProps
  extends WithStyles<typeof configurationStyles> {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export interface IConfigurationState {
  anticaptchaKey: string;
  anticaptchaBalance: number;
  lang: Languages;
  pushBulletAccessToken: string;
  pushBulletEmail: string;
  showDebugMessages: boolean;

  updatesChannel: UpdatesChannel;
}
