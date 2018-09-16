import GlobalConfiguration, {
  UpdatesChannel
} from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Pushbullet from "@/utils/Pushbullet";
import { isEmpty } from "@/utils/String";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { configurationStyles } from "@renderer/pages/Configuration/styles";
import {
  ConfigurationProps,
  IConfigurationProps,
  IConfigurationState
} from "@renderer/pages/Configuration/types";
import { AntiCaptcha } from "anticaptcha";
import * as React from "react";

class Configuration extends React.Component<
  ConfigurationProps,
  IConfigurationState
> {
  public state: IConfigurationState = {
    anticaptchaBalance: -1,
    anticaptchaKey: GlobalConfiguration.anticaptchaKey,
    lang: GlobalConfiguration.lang,
    pushBulletAccessToken: GlobalConfiguration.pushBulletAccessToken,
    pushBulletEmail: "",
    showDebugMessages: GlobalConfiguration.showDebugMessages,
    updatesChannel: GlobalConfiguration.updatesChannel
  };

  public componentDidMount() {
    GlobalConfiguration.Updated.on(this.globalConfigurationUpdated);
    this.updateAnticaptchaBalance();
  }

  public componentWillUnmount() {
    GlobalConfiguration.Updated.off(this.globalConfigurationUpdated);
  }

  public render() {
    const { classes, dialogOpen, closeDialog } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          open={dialogOpen}
          onClose={closeDialog}
          aria-labelledby="form-dialog-title"
        >
          {/* <DialogTitle id="form-dialog-title"></DialogTitle> */}
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="lang-simple">
                {LanguageManager.trans("lang")}
              </InputLabel>
              <Select
                value={this.state.lang}
                onChange={this.langChanged}
                inputProps={{ id: "lang-simple", name: "lang" }}
              >
                <MenuItem value="fr">
                  <img src={require("../../img/fr.png")} alt="fr" />
                </MenuItem>
                <MenuItem value="de">
                  <img src={require("../../img/de.png")} alt="de" />
                </MenuItem>
                <MenuItem value="en">
                  <img src={require("../../img/us.png")} alt="us" />
                </MenuItem>
                <MenuItem value="es">
                  <img src={require("../../img/es.png")} alt="es" />
                </MenuItem>
                <MenuItem value="it">
                  <img src={require("../../img/it.png")} alt="it" />
                </MenuItem>
                <MenuItem value="pt">
                  <img src={require("../../img/pt.png")} alt="pt" />
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="anticaptcha">
                {LanguageManager.trans("anticaptchaKey")}
              </InputLabel>
              <Input
                autoFocus={true}
                id="anticaptcha"
                type="text"
                value={this.state.anticaptchaKey}
                onChange={this.anticaptchaChanged}
                fullWidth={true}
              />
              <Typography>Balance: {this.state.anticaptchaBalance}</Typography>
              <Button
                variant="raised"
                size="small"
                color="primary"
                onClick={this.updateAnticaptchaBalance}
              >
                {LanguageManager.trans("update")}
              </Button>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="pushBulletAccessToken">
                {LanguageManager.trans("pushBulletAccessToken")}
              </InputLabel>
              <Input
                autoFocus={true}
                id="pushBulletAccessToken"
                type="text"
                value={this.state.pushBulletAccessToken}
                onChange={this.pushBulletAccessTokenChanged}
                fullWidth={true}
              />
              <Typography>Email: {this.state.pushBulletEmail}</Typography>
              <Button
                variant="raised"
                size="small"
                color="primary"
                onClick={this.updatePushBulletAccessToken}
              >
                {LanguageManager.trans("update")}
              </Button>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.showDebugMessages}
                    onChange={this.showDebugMessagesChanged}
                  />
                }
                label={LanguageManager.trans("showDebug")}
              />
            </FormGroup>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="updates-simple">
                {LanguageManager.trans("update")}
              </InputLabel>
              <Select
                value={this.state.updatesChannel}
                onChange={this.updatesChannelChanged}
                inputProps={{ id: "updates-simple", name: "updates" }}
              >
                <MenuItem value={UpdatesChannel.LATEST}>LATEST</MenuItem>
                <MenuItem value={UpdatesChannel.BETA}>BETA</MenuItem>
                <MenuItem value={UpdatesChannel.ALPHA}>ALPHA</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} variant="raised" color="primary">
              {LanguageManager.trans("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  private pushBulletAccessTokenChanged = e => {
    this.setState({ pushBulletAccessToken: e.target.value });
    GlobalConfiguration.pushBulletAccessToken = e.target.value;
    Pushbullet.changeToken(GlobalConfiguration.pushBulletAccessToken);
    GlobalConfiguration.save();
  };
  private updatePushBulletAccessToken = async () => {
    const response = await Pushbullet.getInfo();
    this.setState({ pushBulletEmail: response.email });
  };
  private langChanged = e => {
    this.setState({ lang: e.target.value });
    GlobalConfiguration.lang = e.target.value;
    GlobalConfiguration.save();
  };

  private updatesChannelChanged = e => {
    this.setState({ updatesChannel: e.target.value });
    GlobalConfiguration.updatesChannel = e.target.value;
    GlobalConfiguration.save();
  };

  private showDebugMessagesChanged = event => {
    this.setState({ showDebugMessages: event.target.checked });
    GlobalConfiguration.showDebugMessages = event.target.checked;
    GlobalConfiguration.save();
  };

  private anticaptchaChanged = e => {
    this.setState({ anticaptchaKey: e.target.value });
    GlobalConfiguration.anticaptchaKey = e.target.value;
    GlobalConfiguration.save();
  };
  private updateAnticaptchaBalance = async () => {
    const key = GlobalConfiguration.anticaptchaKey;
    if (isEmpty(key)) {
      return;
    }
    const ac = new AntiCaptcha(key);
    const b = await ac.getBalance();
    this.setState({ anticaptchaBalance: b });
  };

  private globalConfigurationUpdated = () => {
    this.setState({
      anticaptchaKey: GlobalConfiguration.anticaptchaKey,
      lang: GlobalConfiguration.lang,
      pushBulletAccessToken: GlobalConfiguration.pushBulletAccessToken,
      showDebugMessages: GlobalConfiguration.showDebugMessages,
      updatesChannel: GlobalConfiguration.updatesChannel
    });
  };
}

export default withStyles(configurationStyles)<IConfigurationProps>(
  Configuration
);
