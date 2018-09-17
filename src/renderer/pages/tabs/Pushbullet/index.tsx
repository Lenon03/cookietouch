import LanguageManager from "@/configurations/language/LanguageManager";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import { pushbulletTabStyles } from "@renderer/pages/tabs/Pushbullet/styles";
import {
  IPushbulletTabProps,
  IPushbulletTabState,
  PushbulletTabProps
} from "@renderer/pages/tabs/Pushbullet/types";
import * as React from "react";

class Pushbullet extends React.Component<
  PushbulletTabProps,
  IPushbulletTabState
> {
  public state: IPushbulletTabState = {
    active: false,
    captchaRequest: false,
    characterConnected: false,
    disconnect: false,
    inJail: false,
    level: false,
    modOnMap: false,
    modPrivateMessage: false,
    privateMessage: false,
    scriptError: false
  };

  public componentDidMount() {
    this.props.account.config.Updated.on(this.configUpdated);
    this.props.account.game.character.CharacterSelected.on(
      this.characterSelected
    );
  }

  public componentWillUnmount() {
    this.props.account.config.Updated.off(this.configUpdated);
    this.props.account.game.character.CharacterSelected.off(
      this.characterSelected
    );
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container={true} spacing={8}>
          <Grid item={true} xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="active"
                        name="active"
                        checked={this.state.active}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletNotificationTitle")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="captchaRequest"
                        name="captchaRequest"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.captchaRequest}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletCaptchaRequest")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="disconnect"
                        name="disconnect"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.disconnect}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletDisconnect")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="inJail"
                        name="inJail"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.inJail}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletInJail")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="level"
                        name="level"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.level}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletLevel")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="scriptError"
                        name="scriptError"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.scriptError}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletScriptError")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="modOnMap"
                        name="modOnMap"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.modOnMap}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletModOnMap")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="modPrivateMessage"
                        name="modPrivateMessage"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.modPrivateMessage}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletModPrivateMessage")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="privateMessage"
                        name="privateMessage"
                        disabled={
                          this.state.characterConnected === false ||
                          this.state.active === false
                        }
                        color="primary"
                        checked={this.state.privateMessage}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("pushBulletPrivateMessage")}
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
  private characterSelected = () => {
    this.setState({
      characterConnected: true
    });
  };
  private handleSwitchChange = (event, checked) => {
    this.setState({ [event.target.name]: checked } as Pick<
      IPushbulletTabState,
      keyof IPushbulletTabState
    >);
    this.props.account.config.pushBullet[event.target.name] = checked;
    this.props.account.config.save();
  };

  private configUpdated = () => {
    this.setState({
      active: this.props.account.config.pushBullet.active,
      captchaRequest: this.props.account.config.pushBullet.captchaRequest,
      disconnect: this.props.account.config.pushBullet.disconnect,
      inJail: this.props.account.config.pushBullet.inJail,
      level: this.props.account.config.pushBullet.level,
      modOnMap: this.props.account.config.pushBullet.modOnMap,
      modPrivateMessage: this.props.account.config.pushBullet.modPrivateMessage,
      privateMessage: this.props.account.config.pushBullet.privateMessage,
      scriptError: this.props.account.config.pushBullet.scriptError
    });
  };
}

export default withStyles(pushbulletTabStyles)<IPushbulletTabProps>(Pushbullet);
