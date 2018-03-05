import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import { Languages } from "@/configurations/language/Languages";
import Account from "@account";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "material-ui/Dialog";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import { FormControl, FormHelperText } from "material-ui/Form";
import IconButton from "material-ui/IconButton";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import Switch from "material-ui/Switch";
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
                <MenuItem value="fr">fr</MenuItem>
                <MenuItem value="de">de</MenuItem>
                <MenuItem value="en">en</MenuItem>
                <MenuItem value="es">es</MenuItem>
                <MenuItem value="it">it</MenuItem>
                <MenuItem value="pt">pt</MenuItem>
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
