import { UpdatesChannel } from "@/configurations/GlobalConfiguration";
import { Languages } from "@/configurations/language/Languages";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { ConfigurationStyle } from "@renderer/pages/Configuration/styles";

export interface IConfigurationProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export interface IConfigurationState {
  anticaptchaKey: string;
  anticaptchaBalance: number;
  lang: Languages;
  showDebugMessages: boolean;

  updatesChannel: UpdatesChannel;
}

export type ConfigurationProps = IConfigurationProps &
  WithStyles<ConfigurationStyle>;
