import LanguageManager from "@/configurations/language/LanguageManager";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { signin } from "@renderer/FirebaseHelpers";
import {
  ILoginFormDialogProps,
  ILoginFormDialogState,
  loginFormDialogStyles
} from "@renderer/pages/LoginFormDialog/types";
import { remote } from "electron";
import * as React from "react";

class LoginFormDialog extends React.Component<
  ILoginFormDialogProps,
  ILoginFormDialogState
> {
  public state: ILoginFormDialogState = {
    email: "",
    password: "",
    showPassword: false
  };

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
            {/* <DialogContentText>
              You need an account ...
            </DialogContentText> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                autoFocus={true}
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                fullWidth={true}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">
                {LanguageManager.trans("password")}
              </InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                fullWidth={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} variant="raised" color="primary">
              {LanguageManager.trans("cancel")}
            </Button>
            <Button onClick={this.signin} variant="raised" color="primary">
              {LanguageManager.trans("connect")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private handleChange = (prop: any) => (event: any) => {
    this.setState({ [prop]: event.target.value } as Pick<
      ILoginFormDialogState,
      keyof ILoginFormDialogState
    >);
  };

  private handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  private handleClickShowPasssword = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }));
  };

  private signin = async () => {
    try {
      const result = await signin(this.state.email, this.state.password);

      if (!result) {
        remote.dialog.showErrorBox(
          LanguageManager.trans("error"),
          LanguageManager.trans("emailValidated")
        );
      } else {
        this.props.closeDialog();
        this.setState({ email: "", password: "" });
      }
    } catch (e) {
      remote.dialog.showErrorBox(
        LanguageManager.trans("error"),
        LanguageManager.trans("invalidCredentials")
      );
    }
  };
}

export default withStyles(loginFormDialogStyles)(LoginFormDialog);
