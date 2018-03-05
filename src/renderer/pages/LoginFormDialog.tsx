import LanguageManager from "@/configurations/language/LanguageManager";
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
import { FormControl, FormHelperText } from "material-ui/Form";
import IconButton from "material-ui/IconButton";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import * as React from "react";
import { signin, signup } from "../FirebaseHelpers";

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
  email: string;
  password: string;
  showPassword: boolean;
}

type Props = IProps & WithStyles<style>;

class LoginFormDialog extends React.Component<Props, IState> {

  public state: IState = {
    email: "",
    password: "",
    showPassword: false,
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
            {/* <DialogContentText>
              You need an account ...
            </DialogContentText> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                autoFocus
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">{LanguageManager.trans("password")}</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog()} color="primary">
              {LanguageManager.trans("cancel")}
            </Button>
            <Button onClick={this.signin} color="primary">
              {LanguageManager.trans("connect")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  }

  private handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  private handleClickShowPasssword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  }

  private signin = async () => {
    const result = await signin(this.state.email, this.state.password);

    if (result) {
      this.props.closeDialog();
      this.setState({ email: "", password: "" });
    } else {
      const result2 = await signup(this.state.email, this.state.password);

      if (result2) {
        this.props.closeDialog();
        this.setState({
          email: "",
          password: "",
        });
      }
    }
  }
}

export default withStyles(styles)<IProps>(LoginFormDialog);
