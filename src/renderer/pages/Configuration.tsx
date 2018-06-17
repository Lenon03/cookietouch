import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import { Languages } from "@/configurations/language/Languages";
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
import withStyles, { StyleRulesCallback, WithStyles } from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import * as React from "react";

type style = "root" | "formControl";

const styles: StyleRulesCallback<style> = (theme) => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
});

interface IProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

interface IState {
  anticaptchaKey: string;
  lang: Languages;
  showDebugMessages: boolean;
}

type Props = IProps & WithStyles<style>;

class Configuration extends React.Component<Props, IState> {

  public state: IState = {
    anticaptchaKey: GlobalConfiguration.anticaptchaKey,
    lang: GlobalConfiguration.lang,
    showDebugMessages: GlobalConfiguration.showDebugMessages,
  };

  public render() {
    const { classes, dialogOpen, closeDialog } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          open={dialogOpen}
          onClose={() => closeDialog()}
          aria-labelledby="form-dialog-title"
        >
          {/* <DialogTitle id="form-dialog-title"></DialogTitle> */}
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="lang-simple">{LanguageManager.trans("lang")}</InputLabel>
              <Select
                value={this.state.lang}
                onChange={this.langChanged}
                inputProps={{ id: "lang-simple", name: "lang" }}
              >
                <MenuItem value="fr"><img src={require("../img/fr.png")} alt="fr" /></MenuItem>
                <MenuItem value="de"><img src={require("../img/de.png")} alt="de" /></MenuItem>
                <MenuItem value="en"><img src={require("../img/us.png")} alt="us" /></MenuItem>
                <MenuItem value="es"><img src={require("../img/es.png")} alt="es" /></MenuItem>
                <MenuItem value="it"><img src={require("../img/it.png")} alt="it" /></MenuItem>
                <MenuItem value="pt"><img src={require("../img/pt.png")} alt="pt" /></MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="anticaptcha">{LanguageManager.trans("anticaptchaKey")}</InputLabel>
              <Input
                autoFocus
                id="anticaptcha"
                type="text"
                value={this.state.anticaptchaKey}
                onChange={this.anticaptchaChanged}
                fullWidth
              />
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={this.state.showDebugMessages} onChange={this.showDebugMessagesChanged} />
                }
                label={LanguageManager.trans("showDebug")}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog()} variant="raised" color="primary">
              {LanguageManager.trans("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private anticaptchaChanged = (e) => {
    this.setState({ anticaptchaKey: e.target.value });
    GlobalConfiguration.anticaptchaKey = e.target.value;
  }

  private langChanged = (e) => {
    this.setState({ lang: e.target.value });
    GlobalConfiguration.lang = e.target.value;
  }

  private showDebugMessagesChanged = (event) => {
    this.setState({ showDebugMessages: event.target.checked });
    GlobalConfiguration.showDebugMessages = event.target.checked;
  }
}

export default withStyles(styles)<IProps>(Configuration);
